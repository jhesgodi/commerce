'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Product, ProductVariant } from 'lib/types';

import Price from './price';

const VariantPrice = ({
  product,
  className,
  currencyCodeClassName
}: {
  product: Product;
  className?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState({
    amount: '',
    currencyCode: ''
  });

  useEffect(() => {
    if (!product) return;

    const variant = product.variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase())
      )
    );

    if (variant) {
      setDetails({
        amount: variant.price.amount,
        currencyCode: variant.price.currency
      });
      return;
    }

    setDetails({
      amount: product.price.amount,
      currencyCode: product.price.currency
    });
  }, [searchParams, product]);

  const { amount, currencyCode } = details;
  if (!product || !amount || !currencyCode) return null;

  return (
    <Price
      amount={amount}
      className={className}
      currencyCode={currencyCode}
      currencyCodeClassName={currencyCodeClassName}
    />
  );
};

export default VariantPrice;
