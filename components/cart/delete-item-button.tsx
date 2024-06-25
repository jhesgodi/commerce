'use client';

import clsx from 'clsx';

import { XMarkIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';

import type { CartItem } from 'lib/types';
import { useStore } from 'state/store-context';

function SubmitButton({ inProgress }: { inProgress: boolean }) {
  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (inProgress) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={inProgress}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': inProgress
        }
      )}
    >
      {inProgress ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [{ cartProcessing: inProgress }, storeDispatch] = useStore();

  return (
    <form
      action={() => {
        storeDispatch({ payload: { type: 'REMOVE_ITEM_FROM_CART', id: item.productId } });
      }}
    >
      <SubmitButton inProgress={inProgress} />
    </form>
  );
}
