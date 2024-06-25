import { NextRequest, NextResponse } from 'next/server';

import db from 'lib/db';
import { safeJsonParse } from 'lib/utils/utils';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  const _products = await db.product.findMany();

  if (_products.length === 0) {
    return NextResponse.json({ message: 'No products found', params }, { status: 404 });
  }

  const products = _products.map(({ productOptions, productVariants, ...product }) => ({
    ...product,
    productOptions: safeJsonParse(productOptions),
    productVariants: safeJsonParse(productVariants)
  }));

  return NextResponse.json({ params, products });
}
