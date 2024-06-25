'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import type { CartItem } from 'lib/types';
import { useStore } from 'state/store-context';

function SubmitButton({ type, inProgress }: { type: 'plus' | 'minus'; inProgress: boolean }) {
  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (inProgress) e.preventDefault();
      }}
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      aria-disabled={inProgress}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'cursor-not-allowed': inProgress,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {inProgress ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({ item, type }: { item: CartItem; type: 'plus' | 'minus' }) {
  const [{ cartProcessing: inProgress }, storeDispatch] = useStore();

  return (
    <form
      action={() => {
        const id = item.productId;
        const qty = type === 'plus' ? +1 : -1;
        storeDispatch({ payload: { type: 'UPDATE_ITEM_QTY', id, qty } });
      }}
    >
      <SubmitButton type={type} inProgress={inProgress} />
    </form>
  );
}
