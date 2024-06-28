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
    'relative flex mb-4 xl:mb-0 xl:mr-4 items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)} disabled>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId && selectedVariantId !== '<unknown>') {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        disabled
        className={clsx(buttonClasses, disabledClasses, 'w-full')}
      >
        Please select an option
      </button>
    );
  }

  return (
    <div className="row flex flex-col justify-start xl:flex-row">
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
        <div className="mx-2 block">
          {inProgress ? (
            <LoadingDots className="mb-3 bg-white" />
          ) : (
            <ArrowRightCircleIcon className="h-5" />
          )}
        </div>
        One Click Buy
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
        <div className="mx-2 block">
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
  const variantId = product.variants.length > 0 ? variant?.id : '<unknown>';

  return (
    <SubmitButton
      inProgress={inProgress}
      availableForSale={product.inStock}
      selectedVariantId={variantId}
      addToCart={(buyNow: boolean) => product && addToCart(product, variant, buyNow)}
    />
  );
}
