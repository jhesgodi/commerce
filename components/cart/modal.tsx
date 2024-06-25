'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import type { Cart } from 'lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { SALE_WIDGET_MOUNT_ROOT_ID } from 'state/config/const';
import { useStore } from 'state/store-context';
import CloseCart from './close-cart';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [{ cartOpen: isOpen, cartProcessing: inProgress, cartItems }, storeDispatch] = useStore();

  const setIsOpen = useMemo(
    () => (open: boolean) => {
      storeDispatch({
        payload: { type: 'SET_TOGGLE_CART_OPEN', open }
      });

      if (!open && inProgress) {
        storeDispatch({
          payload: { type: 'SET_CART_PROCESSING', processing: false }
        });
      }
    },
    [storeDispatch, inProgress]
  );

  const quantityRef = useRef(cart?.quantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.quantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.quantity;
    }
  }, [isOpen, setIsOpen, cart?.quantity, quantityRef]);

  const cartCurrencyCode = cartItems[0]?.product.variants[0]?.price.currency || 'USD';
  const cartTotal = cartItems.reduce((acc, item) => {
    const variant = item.product.variants.find((v) => v.id === item.productId);
    return acc + (variant?.price.amount || 0) * item.qty;
  }, 0);
  const cartFee = cartTotal * 0.2;

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.quantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[480px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  {inProgress ? 'Processing Cart' : 'Your Cart'}
                </p>

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {/* Empty Cart */}
              {Boolean(!cartItems.length && !inProgress) && (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              )}

              {/* Review Cart */}
              {Boolean(cartItems.length && !inProgress) && (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cartItems.map((item, i) => {
                      const variant = item.product.variants.find((v) => v.id === item.productId);

                      const price = Number(variant?.price.amount || 0) * item.qty;
                      const currencyCode = variant?.price.currency || 'USD';

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              {/* <DeleteItemButton item={item} /> */}
                            </div>
                            <Link
                              href="#"
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={item.name}
                                  src={item.image}
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">{item.name}</span>
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={price.toString()}
                                currencyCode={currencyCode}
                              />
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditItemQuantityButton item={item} type="minus" />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">{item.qty}</span>
                                </p>
                                <EditItemQuantityButton item={item} type="plus" />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Fees (2%)</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cartFee.toString()}
                        currencyCode={cartCurrencyCode}
                      />
                    </div>

                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cartTotal.toString()}
                        currencyCode={cartCurrencyCode}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      storeDispatch({
                        payload: { type: 'SET_CART_PROCESSING', processing: true }
                      });
                    }}
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Checkout Now
                  </button>
                </div>
              )}

              {/* Processing Cart */}
              {inProgress && (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <div id={SALE_WIDGET_MOUNT_ROOT_ID} />
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
