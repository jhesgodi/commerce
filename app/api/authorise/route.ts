import db from 'lib/db';
import { NextRequest, NextResponse } from 'next/server';

import { Money } from 'lib/types';
import {
  ConversionRates,
  ReqPricing,
  ReqProduct,
  checkProducts,
  fetchConversions,
  findPriceByCurrency,
  getTokenId
} from 'lib/utils/db-utils';

type AuthoriseParams = {
  recipient_address: string;
  currency: string;
  products: ReqProduct[];
};

type AuthoriseResponse = {
  reference: string;
  currency: string;
  products: {
    product_id: string;
    collection_address: string;
    contract_type: string;
    detail: {
      token_id: string;
      amount: number;
    }[];
  }[];
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { currency, products, recipient_address }: AuthoriseParams = await request.json();

  if (!currency || !products || !recipient_address) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const [error, dbProducts] = await checkProducts(products);

  if (typeof error === 'string') {
    return NextResponse.json({ error }, { status: 404 });
  }

  let conversionRates: ConversionRates = {};
  try {
    conversionRates = await fetchConversions();
  } catch {
    return NextResponse.json({ error: 'Error fetching conversion rates' }, { status: 500 });
  }

  const tokenIds: Record<string, string[]> = products.reduce(
    (acc, { product_id, quantity }) => ({
      ...acc,
      [product_id]: Array.from({ length: quantity }, () => getTokenId(product_id))
    }),
    {}
  );

  const productsPricing: Record<string, ReqPricing> = dbProducts.reduce(
    (acc, { id, price }) => ({
      ...acc,
      [id]: findPriceByCurrency(price, currency, conversionRates)
    }),
    {}
  );

  const totalQuantity = products.reduce((acc, { quantity }) => acc + quantity, 0);
  const totalAmount = dbProducts.reduce((acc, { price }) => acc + Number(price.amount), 0);

  const totalPrice: Money = {
    amount: (totalAmount * totalQuantity).toString(),
    currency: dbProducts[0]!.price.currency,
    currencyType: ''
  };
  const totalPricing = findPriceByCurrency(totalPrice, currency, conversionRates);

  try {
    const updateQtyTxns = products.map(({ product_id, quantity }) =>
      db.product.update({
        where: { id: product_id },
        data: { stock: { decrement: quantity } }
      })
    );

    const createOrderTxn = db.order.create({
      data: {
        status: 'pending',
        currency,
        totalPrice: totalPricing.amount.toString(),
        orderProduct: {
          create: products.map(({ product_id, quantity }) => ({
            unitPrice: productsPricing[product_id]!.amount.toString(),
            tokenIds: JSON.stringify(tokenIds[product_id]!),
            quantity,
            product: { connect: { id: dbProducts.find(({ id }) => id === product_id)!.id } }
          }))
        }
      }
    });

    const [createdOrder] = await db.$transaction([createOrderTxn, ...updateQtyTxns]);

    const response: AuthoriseResponse = {
      reference: createdOrder.id,
      currency,
      products: products.map(({ product_id, quantity }) => {
        const dbProduct = dbProducts.find(({ id }) => id === product_id)!;
        return {
          product_id,
          collection_address: process.env.NFT_COLLECTION_ADDRESS!,
          contract_type: process.env.NFT_COLLECTION_TYPE!,
          detail: Array.from({ length: quantity }, (_, i) => ({
            token_id: tokenIds[product_id]?.[i]!,
            amount: findPriceByCurrency(dbProduct.price, currency, conversionRates).amount
          }))
        };
      })
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error, message: 'Error creating order' }, { status: 500 });
  }
}
