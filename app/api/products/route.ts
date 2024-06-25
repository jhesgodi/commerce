import { NextResponse } from 'next/server';

import db from 'lib/db';
import { parseToProducts } from 'lib/utils/db-utils';

export async function GET(): Promise<NextResponse> {
  const dbProducts = await db.product.findMany();

  if (dbProducts.length === 0) {
    return NextResponse.json({ message: 'No products found' }, { status: 404 });
  }

  const products = parseToProducts(dbProducts);

  return NextResponse.json({ products });
}

export const dynamic = 'force-dynamic';
