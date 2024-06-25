/* eslint-disable no-unused-vars */
import { checkout as ImtblCheckout } from '@imtbl/sdk';
import { CartItem, Product } from 'lib/types';

type SetToggleWalletOpen = {
  type: 'SET_TOGGLE_WALLET_OPEN';
  open: boolean;
};

type SetWalletAddress = {
  type: 'SET_WALLET_ADDRESS';
  address: string | undefined;
};

type SetWalletConnected = {
  type: 'SET_WALLET_CONNECTED';
  connected: boolean;
};

type SetWalletConnecting = {
  type: 'SET_WALLET_CONNECTING';
  connecting: boolean;
};

type SetWalletDisconnected = {
  type: 'SET_WALLET_DISCONNECTED';
};

type SetCheckoutResult = {
  type: 'SET_CHECKOUT_RESULT';
  product: Product;
  order: ImtblCheckout.SaleSuccess;
};

type ResetCheckoutResult = {
  type: 'RESET_CHECKOUT_RESULT';
};

type SetToggleCartOpen = {
  type: 'SET_TOGGLE_CART_OPEN';
  open: boolean;
};

type SetCartProcessing = {
  type: 'SET_CART_PROCESSING';
  processing: boolean;
};

type AddCartItem = {
  type: 'ADD_ITEM_TO_CART';
  item: CartItem;
};

type UpdateCartItemQty = {
  type: 'UPDATE_ITEM_QTY';
  id: string;
  qty: number;
};

type RemoveCartItem = {
  type: 'REMOVE_ITEM_FROM_CART';
  id: string;
};

type ClearCart = {
  type: 'CLEAR_CART';
};

type StoreActionPayload =
  | SetToggleWalletOpen
  | SetWalletAddress
  | SetWalletConnected
  | SetWalletConnecting
  | SetWalletDisconnected
  | SetCheckoutResult
  | SetToggleCartOpen
  | AddCartItem
  | UpdateCartItemQty
  | RemoveCartItem
  | ClearCart
  | SetCartProcessing
  | ResetCheckoutResult;

export type StoreAction = {
  payload: StoreActionPayload;
};
