import { WalletIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ConnectWallet({ className }: { className?: string }) {
  const label = 'Connect Wallet';

  return (
    <button className="relative mr-2 flex h-11 w-fit items-center justify-center text-nowrap rounded-md border border-neutral-200 px-3 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <WalletIcon className={clsx('h-4 transition-all ease-in-out hover:scale-110 ', className)} />
      <span className="ml-2 block">{label}</span>
    </button>
  );
}
