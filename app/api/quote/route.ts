import { NextRequest, NextResponse } from 'next/server';

import { Money } from 'lib/types';
import {
  CRYPTO_CURRENCIES,
  ReqCurrency,
  ReqPricing,
  ReqProduct,
  checkProducts,
  fetchConversions,
  getPrices
} from 'lib/utils/db-utils';
import { safeJsonParse } from 'lib/utils/utils';

type QuoteResponse = {
  config: {
    contract_id: string;
  };
  currencies: ReqCurrency[];
  products: {
    product_id: string;
    quantity: number;
    pricing: ReqPricing[];
  }[];
  totals: ReqPricing[];
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const quoteProducts = safeJsonParse<ReqProduct[]>(atob(searchParams.get('products') ?? ''), []);
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
      config: {
        contract_id: process.env.TRANSAK_CONTRACT_ID ?? ''
      },
      currencies: CRYPTO_CURRENCIES,
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
