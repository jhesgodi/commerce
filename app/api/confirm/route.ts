import db from 'lib/db';
import { safeJsonParse } from 'lib/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

type ConfirmationParams = {
  reference: string;
  tx_hash: string;
  token_id_hash: string;
  recipient_address: string;
  order: {
    contract_address: string;
    total_amount: number;
    deadline: number;
    created_at: number;
    currency: string;
    products: {
      product_id: string;
      detail: {
        token_id: string;
        amount: number;
      }[];
      quantity: number;
      collection_address: string;
      collection_type: string;
    }[];
  };
};

export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { reference: id }: ConfirmationParams = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const order = await db.order.findUnique({
    where: { id, AND: { status: 'pending' } },
    include: { orderProduct: true }
  });

  if (!order) {
    return NextResponse.json({ message: `Order ${id} not found` }, { status: 404 });
  }

  try {
    const tokenStatusUpdateTxns = order.orderProduct.map((orderProduct) => {
      const tokenIds = safeJsonParse<string[]>(orderProduct.tokenIds!, []);
      return db.tokens.updateMany({
        where: { tokenId: { in: tokenIds }, AND: { status: 'pending' } },
        data: { status: 'minted' }
      });
    });

    const orderUpdateTxn = db.order.update({
      where: { id },
      data: {
        status: 'confirmed'
      }
    });

    await db.$transaction([orderUpdateTxn, ...tokenStatusUpdateTxns]);
  } catch (error) {
    console.log('🐛 ~ /api/confirm:', error);
    return NextResponse.json({ error, message: `Error updating order ${id}` }, { status: 500 });
  }

  return NextResponse.json({ message: `Order ${id} confirmed successfully` }, { status: 200 });
}
