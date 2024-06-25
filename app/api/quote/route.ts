import { NextRequest, NextResponse } from 'next/server';

import { Money } from 'lib/types';
import {
  ReqPricing,
  ReqProduct,
  checkProducts,
  fetchConversions,
  getPrices
} from 'lib/utils/db-utils';

type QuoteParams = {
  recipient_address: string;
  products: ReqProduct[];
};

type QuoteResponse = {
  products: {
    product_id: string;
    quantity: number;
    pricing: ReqPricing[];
  }[];
  totals: ReqPricing[];
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { products: quoteProducts }: QuoteParams = await request.json();

  if (!quoteProducts.length) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 404 });
  }

  const [error, products] = await checkProducts(quoteProducts);

  if (typeof error === 'string') {
    return NextResponse.json({ error }, { status: 404 });
  }

  try {
    const conversionRates = await fetchConversions();

    const totalPrice: Money = {
      amount: products.reduce((acc, { price }) => acc + Number(price.amount), 0).toString(),
      currency: products[0]?.price.currency!,
      currencyType: products[0]?.price.currencyType!
    };

    const quoteResponse: QuoteResponse = {
      products: products.map(({ id, price }) => ({
        product_id: id,
        quantity: quoteProducts.find(({ product_id }) => product_id === id)?.quantity!,
        pricing: getPrices(price, conversionRates)
      })),
      totals: getPrices(totalPrice, conversionRates)
    };

    return NextResponse.json(quoteResponse);
  } catch (error) {
    console.error('Unexpected error', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
