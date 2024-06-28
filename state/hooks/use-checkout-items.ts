import { checkout as ImtblCheckout } from '@imtbl/sdk';
import { useEffect } from 'react';

import { Product, ProductVariant } from 'lib/types';

import { SALE_WIDGET_MOUNT_ROOT_ID } from 'state/config/const';
import { COLLECTION_NAME, IMTBL_HUB_ENVIRONMENT_ID } from 'state/config/envs';

import { useStore } from 'state/store-context';
import { useWidgets } from 'state/widgets-context';

export const useCheckoutItems = () => {
  const [{ saleWidget }] = useWidgets();
  const [{ cartProcessing: inProgress, cartItems }, storeDispatch] = useStore();

  useEffect(() => {
    if (!saleWidget) return;

    saleWidget.addListener(ImtblCheckout.SaleEventType.CLOSE_WIDGET, () => {
      storeDispatch({
        payload: { type: 'SET_CART_PROCESSING', processing: false }
      });
      saleWidget.unmount();
    });

    return () => {
      saleWidget.removeListener(ImtblCheckout.SaleEventType.CLOSE_WIDGET);
    };
  }, [saleWidget, storeDispatch]);

  useEffect(() => {
    if (!saleWidget || !cartItems.length || !inProgress) {
      return;
    }

    const items: ImtblCheckout.SaleItem[] = cartItems.map(({ product, ...rest }) => rest);
    const multiItemCart = items.length > 1;

    // Delay mounting until modal component is rendered
    setTimeout(() => {
      saleWidget.mount(SALE_WIDGET_MOUNT_ROOT_ID, {
        items,
        collectionName: COLLECTION_NAME,
        environmentId: IMTBL_HUB_ENVIRONMENT_ID,
        // Exclude debit and credit card payment types for multi-item carts
        // As Transak provider does not support minting multiple NFTs
        excludePaymentTypes: multiItemCart
          ? [ImtblCheckout.SalePaymentTypes.DEBIT, ImtblCheckout.SalePaymentTypes.CREDIT]
          : undefined
      });
    }, 500);
  }, [cartItems, inProgress, saleWidget]);

  const addToCart = (product: Product, variant?: ProductVariant, buyNow = false) => {
    const name = variant ? variant.title : product.title;
    const productId = variant ? variant.id : product.id;

    if (buyNow) {
      storeDispatch({ payload: { type: 'CLEAR_CART' } });
      storeDispatch({
        payload: { type: 'SET_CART_PROCESSING', processing: true }
      });
    }

    storeDispatch({
      payload: {
        type: 'ADD_ITEM_TO_CART',
        item: {
          qty: 1,
          name,
          productId,
          description: product.description,
          image: product.image.url,
          product
        }
      }
    });
    storeDispatch({
      payload: { type: 'SET_TOGGLE_CART_OPEN', open: true }
    });
  };

  return {
    addToCart,
    inProgress
  };
};
