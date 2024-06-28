import db from 'lib/db';
import { NextResponse } from 'next/server';

import { parseToProducts } from 'lib/utils/db-utils';

export const dynamic = 'force-dynamic';
export async function GET(): Promise<NextResponse> {
  try {
    const dbProducts = await db.product.findMany({
      include: { NFTCollection: true }
    });

    if (dbProducts.length === 0) {
      return NextResponse.json({ message: 'No products found' }, { status: 404 });
    }

    const products = parseToProducts(dbProducts);

    return NextResponse.json(products);
  } catch (error) {
    console.log('🐛 ~ /api/products:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
