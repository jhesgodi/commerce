'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  EllipsisHorizontalCircleIcon,
  WalletIcon
} from '@heroicons/react/24/outline';

import { WIDGETS_MOUNT_ROOT_ID } from 'state/config/const';
import { useConnectWallet, useWalletBalances } from 'state/hooks';
import { useStore } from 'state/store-context';

export default function ConnectWallet() {
  const [{ connected, connecting, walletAddress, walletOpen }] = useStore();
  const { openWallet } = useWalletBalances();
  const { connectWallet } = useConnectWallet();

  const [Icon, setIcon] = useState<any>(null);

  const busy = walletOpen || connecting;

  let copy = 'Connect Wallet';
  if (connecting) {
    copy = 'Connecting...';
  }
  if (connected) {
    copy = 'Your Balances';
  }

  useEffect(() => {
    if (connecting === false && connected === false && Icon !== null) {
      setIcon(CurrencyDollarIcon);
    }

    if (connecting === true && connected === false) {
      setIcon(EllipsisHorizontalCircleIcon);
    }

    if (connected === true && connecting === false) {
      setIcon(CheckCircleIcon);
      setTimeout(() => {
        setIcon(CurrencyDollarIcon);
      }, 1500);
    }
  }, [connected, connecting, walletAddress, Icon]);

  return (
    <>
      <button
        className={clsx(
          'relative mr-2 flex h-11 w-fit min-w-48 items-center justify-center text-nowrap rounded-md border  px-3 text-black transition-colors dark:text-white',
          {
            'dark:border-slate-700': connecting,
            'border-neutral-200 dark:border-neutral-700': !connecting,
            'cursor-not-allowed': busy,
            'border-emerald-20 dark:border-emerald-700': connected
          }
        )}
        onClick={() => {
          if (busy) return;

          if (connected) {
            openWallet();
            return;
          }

          connectWallet();
        }}
      >
        {Icon && (
          <Icon
            className={clsx('h-4 transition-all ease-in-out hover:scale-110', {
              'animate-pulse stroke-slate-500 ': connecting
            })}
          />
        )}
        {!Icon && (
          <WalletIcon
            className={clsx('h-4 transition-all ease-in-out hover:scale-110', {
              'animate-pulse stroke-slate-500 ': connecting
            })}
          />
        )}
        <span
          className={clsx('ml-2 block', {
            'animate-pulse text-slate-300': connecting
          })}
        >
          {copy}
        </span>
      </button>
      <span id={WIDGETS_MOUNT_ROOT_ID} className="absolute right-0 top-0 z-10 mt-2.5 pr-4 pt-16" />
    </>
  );
}
