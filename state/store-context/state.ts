import { checkout as ImtblCheckout } from '@imtbl/sdk';
import { CartItem, Product } from 'lib/types';

export type StoreState = {
  walletOpen: boolean;
  walletAddress?: string;
  connected: boolean;
  connecting: boolean;
  checkoutResult: {
    product: Product;
    order: ImtblCheckout.SaleSuccess;
  };
  cartOpen: boolean;
  cartProcessing: boolean;
  cartItems: CartItem[];
};

export const initialStoreState: StoreState = {
  walletOpen: false,
  walletAddress: '',
  connected: false,
  connecting: false,
  checkoutResult: {
    product: undefined as unknown as Product,
    order: {} as ImtblCheckout.SaleSuccess
  },
  cartOpen: false,
  cartProcessing: false,
  cartItems: []
};
