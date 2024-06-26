import { Product, ProductVariant } from 'lib/types';

import { useStore } from 'state/store-context';

export const useCheckoutItems = () => {
  const [{ cartProcessing: inProgress, cartItems }, storeDispatch] = useStore();
  console.log('🐛 ~ cartItems:', cartItems);

  // TODO: process cart items and checkout nfts

  const addToCart = (product: Product, variant: ProductVariant, buyNow = false) => {
    storeDispatch({
      payload: {
        type: 'ADD_ITEM_TO_CART',
        item: {
          qty: 1,
          name: variant.title,
          productId: variant.id,
          description: product.description,
          image: product.image.url,
          product
        }
      }
    });
    storeDispatch({
      payload: { type: 'SET_TOGGLE_CART_OPEN', open: true }
    });

    if (buyNow) {
      storeDispatch({
        payload: { type: 'SET_CART_PROCESSING', processing: true }
      });
    }
  };

  return {
    addToCart,
    inProgress
  };
};
