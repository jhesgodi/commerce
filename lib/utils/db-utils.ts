import { uuidv7 } from 'uuidv7';

import db from 'lib/db';
import { Image, Money, Product, ProductVariant } from 'lib/types';
import { safeJsonParse } from './utils';

const parseToImage = (url: string, altText: string): Image => ({
  url,
  altText,
  height: 100,
  width: 100
});

export const parseToProducts = <T extends Record<string, any>>(products: T[]): Product[] => {
  return products.map<Product>((product) => ({
    rootId: product.rootId,
    id: product.id,
    slug: product.id,
    title: product.name,
    description: product.description,
    stock: product.stock,
    descriptionHtml: `<p>${product.description}</p>`,
    inStock: true,
    price: safeJsonParse(product.price, { amount: '0', currency: 'USD' }),
    image: parseToImage(product.image, product.name),
    images: [parseToImage(product.image, product.name)],
    seo: {
      title: product.name,
      description: product.description
    },
    tags: [],
    options: safeJsonParse(product.productOptions, []),
    variants: safeJsonParse(product.productVariants, []),
    createdAt: product.createdAt.toDateString(),
    updatedAt: product.updatedAt.toDateString(),

    nftCollection: {
      id: product.NFTCollection.id,
      type: product.NFTCollection.contractType,
      address: product.NFTCollection.contractAddress
    }
  }));
};

export const getTokenId = (id: string, collectionType: string = ''): string => {
  // ERC1155 uses the same id
  if (collectionType === 'ERC1155') {
    return id;
  }

  // ERC721 uses unique ids
  return BigInt(`0x${uuidv7().replace(/-/g, '')}`).toString();
};

export type ReqPricing = {
  currency: string;
  currency_type: string;
  amount: number;
};

export type ReqCurrency = {
  base: boolean;
  decimals: number;
  erc20_address: string;
  exchange_id: string;
  name: string;
};

export type ReqProduct = {
  product_id: string;
  quantity: number;
};

export const checkProducts = async (
  reqProducts: ReqProduct[]
): Promise<[string, undefined] | [undefined, Product[]]> => {
  const ids = reqProducts.map(({ product_id }) => product_id);
  const dbProducts = await db.product.findMany({
    where: {
      OR: [{ id: { in: ids } }, ...ids.map((id) => ({ productVariants: { contains: id } }))]
    },
    include: { NFTCollection: true }
  });

  const products = [];

  for (const quoteProduct of reqProducts) {
    const dbProduct = dbProducts.find(({ id, productVariants }) => {
      if (isNaN(Number(quoteProduct.product_id))) {
        return productVariants.includes(id);
      }

      return id === quoteProduct.product_id;
    });

    if (!dbProduct) {
      return [`Product ${quoteProduct.product_id} not found.`, undefined];
    }

    if (dbProduct.stock < quoteProduct.quantity) {
      return [
        `Product ${quoteProduct.product_id} has not enough stock. ${quoteProduct.quantity}/${dbProduct.stock}`,
        undefined
      ];
    }

    const product = { ...dbProduct, rootId: dbProduct.id };

    if (dbProduct.productVariants.includes(quoteProduct.product_id)) {
      const variants = safeJsonParse<ProductVariant[]>(dbProduct.productVariants, []);
      const variant = variants.find(({ id }) => id === quoteProduct.product_id)!;

      product.id = variant.id;
      product.price = JSON.stringify(variant.price);
    }

    products.push(product);
  }

  return [, parseToProducts(products)];
};

const FIAT_CURRENCIES = 'usd';

export const CRYPTO_CURRENCIES: ReqCurrency[] = [
  {
    base: true,
    decimals: 6,
    erc20_address: '0x3b2d8a1931736fc321c24864bceee981b11c3c57',
    exchange_id: 'usd-coin',
    name: 'USDC'
  },
  {
    base: false,
    decimals: 18,
    erc20_address: '0xe9e96d1aad82562b7588f03f49ad34186f996478',
    exchange_id: 'ethereum',
    name: 'ETH'
  },
  {
    base: false,
    decimals: 18,
    erc20_address: '0xb8ee289c64c1a0dc0311364721ada8c3180d838c',
    exchange_id: 'guild-of-guardians',
    name: 'GOG'
  },
  {
    base: false,
    decimals: 18,
    erc20_address: '0x1CcCa691501174B4A623CeDA58cC8f1a76dc3439',
    exchange_id: 'immutable-x',
    name: 'wIMX'
  }
];

const TOKENS: Record<string, string> = CRYPTO_CURRENCIES.reduce(
  (acc, { exchange_id, name }) => ({
    ...acc,
    [exchange_id]: name
  }),
  {}
);

export type ConversionRates = Record<string, Record<string, number>>;

const conversionUrl = `https://checkout-api.sandbox.immutable.com/v1`;

export const fetchConversions = async (): Promise<ConversionRates> => {
  const url = `${conversionUrl}/fiat/conversion?ids=${Object.keys(TOKENS).join(',')}&currencies=${FIAT_CURRENCIES}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch prices');
  }

  const rates: Record<string, Record<string, number>> = await response.json();
  const conversions = Object.entries(rates).reduce(
    (acc, [symbol, rates]) => ({
      ...acc,
      [TOKENS[symbol]!]: rates
    }),
    {} as ConversionRates
  );

  return conversions;
};

export const getPrices = (price: Money, conversionRates: ConversionRates) => {
  const amount = Number(price.amount);
  const symbol = price.currency.toLowerCase();

  const prices = Object.entries(conversionRates).map(([currency, rates]) => ({
    currency,
    currency_type: 'crypto',
    amount: amount / Number(rates?.[symbol] ?? 1)
  }));

  prices.push({
    currency: price.currency,
    currency_type: 'fiat',
    amount
  });

  return prices;
};

export const findPriceByCurrency = (
  price: Money,
  currency: string,
  conversionRates: ConversionRates
): ReqPricing => {
  const prices = getPrices(price, conversionRates);

  const pricing = prices.find((price) => price.currency === currency);
  if (!pricing) {
    throw new Error(`Price not found for ${currency}`);
  }

  return pricing;
};
