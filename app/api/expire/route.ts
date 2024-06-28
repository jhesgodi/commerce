import db from 'lib/db';
import { safeJsonParse } from 'lib/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

type ExpirationParams = {
  reference: string;
};

export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { reference: id }: ExpirationParams = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const dbOrder = await db.order.findUnique({
    where: { id, AND: { status: 'pending' } },
    include: {
      orderProduct: {
        include: {
          product: true
        }
      }
    }
  });

  if (!dbOrder) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  if (dbOrder.status !== 'pending') {
    return NextResponse.json({ message: 'Order already expired or confirmed' }, { status: 200 });
  }

  try {
    const expireOrderTxn = db.order.update({
      where: { id },
      data: { status: 'expired' }
    });

    const revertedStockQty: Record<
      string,
      {
        product_id: string;
        quantity: number;
      }
    > = {};

    const restoreQtyTxns = dbOrder.orderProduct.map(({ productId, quantity }) => {
      const orderProduct = dbOrder.orderProduct.find((op) => op.productId === productId);

      if (!orderProduct) {
        throw new Error('One or more products not found in order');
      }

      revertedStockQty[productId] = {
        product_id: productId,
        quantity
      };

      return db.product.update({
        where: { id: productId },
        data: { stock: { increment: quantity } }
      });
    });

    const removeTokensTxns = dbOrder.orderProduct.map((orderProduct) => {
      const tokenIds = safeJsonParse<string[]>(orderProduct.tokenIds!, []);
      return db.tokens.deleteMany({
        where: { tokenId: { in: tokenIds }, AND: { status: 'reserved' } }
      });
    });

    const [expiredOrder] = await db.$transaction([
      expireOrderTxn,
      ...restoreQtyTxns,
      ...removeTokensTxns
    ]);

    if (expiredOrder.status !== 'expired') {
      return NextResponse.json({ error: 'Error expiring order' }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: `Order ${id} expired successfully`,
        revertedStockQty
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('🐛 ~ /api/expire:', error);
    return NextResponse.json({ error, message: `Error updating order ${id}` }, { status: 500 });
  }
}
