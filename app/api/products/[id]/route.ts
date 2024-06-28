import { NextRequest, NextResponse } from 'next/server';

import db from 'lib/db';
import { parseToProducts } from 'lib/utils/db-utils';

type Params = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';
export async function GET(_: NextRequest, { params }: Params): Promise<NextResponse> {
  const { id } = params;

  try {
    const dbProduct = await db.product.findFirst({
      where: { id },
      include: { NFTCollection: true }
    });

    if (!dbProduct) {
      return NextResponse.json({ message: `Product ${id} not found` }, { status: 404 });
    }

    const [product] = parseToProducts([dbProduct]);

    return NextResponse.json(product);
  } catch (error) {
    console.log(`🐛 ~ /api/product/${id}:`, error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
