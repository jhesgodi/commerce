import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import VariantPrice from 'components/variant-price';
import { Product } from 'lib/types';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <VariantPrice product={product} />
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={product.options} variants={product.variants} />
      </Suspense>

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <Suspense fallback={null}>
        <AddToCart product={product} />
      </Suspense>
    </>
  );
}
