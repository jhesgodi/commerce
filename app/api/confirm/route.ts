import db from 'lib/db';
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

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { reference: id }: ConfirmationParams = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  try {
    await db.order.update({
      where: { id },
      data: {
        status: 'confirmed'
      }
    });
  } catch (error) {
    return NextResponse.json({ error, message: `Error updating order ${id}` }, { status: 500 });
  }

  return NextResponse.json({}, { status: 200 });
}
