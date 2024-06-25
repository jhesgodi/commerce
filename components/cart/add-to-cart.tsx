'use client';

import { ArrowRightCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import { Product, ProductVariant } from 'lib/types';
import { useSearchParams } from 'next/navigation';
import { useCheckoutItems } from 'state/hooks/use-checkout-items';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  addToCart,
  inProgress
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  // eslint-disable-next-line
  addToCart: (buyNow: boolean) => void;
  inProgress: boolean;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white mx-4';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)} disabled>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        Please select an option
      </button>
    );
  }

  return (
    <div className="row flex">
      <button
        aria-label="Add to cart"
        aria-disabled={inProgress}
        className={clsx(buttonClasses, {
          'hover:opacity-90': true,
          [disabledClasses]: inProgress
        })}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (inProgress) return;
          addToCart(true);
        }}
      >
        <div className="absolute left-0 ml-4">
          {inProgress ? (
            <LoadingDots className="mb-3 bg-white" />
          ) : (
            <ArrowRightCircleIcon className="h-5" />
          )}
        </div>
        Buy Now
      </button>
      <button
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (inProgress) return;

          addToCart(false);
        }}
        aria-label="Add to cart"
        aria-disabled={inProgress}
        className={clsx(buttonClasses, {
          'hover:opacity-90': true,
          [disabledClasses]: inProgress
        })}
      >
        <div className="absolute left-0 ml-4">
          {inProgress ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
        </div>
        Add To Cart
      </button>
    </div>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const { addToCart, inProgress } = useCheckoutItems();

  const variant =
    product.variants.length === 1
      ? product.variants[0]
      : product.variants.find((variant: ProductVariant) =>
          variant.selectedOptions.every(
            (option) => option.value === searchParams.get(option.name.toLowerCase())
          )
        );
  const variantId = variant?.id;

  return (
    <SubmitButton
      inProgress={inProgress}
      availableForSale={product.inStock}
      selectedVariantId={variantId}
      addToCart={(buyNow: boolean) => product && variant && addToCart(product, variant, buyNow)}
    />
  );
}
