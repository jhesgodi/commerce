import { checkout as ImtblCheckout } from '@imtbl/sdk';

import { Product } from 'lib/types';
import { StoreState, initialStoreState } from './state';

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

type StoreActionPayload =
  | SetToggleWalletOpen
  | SetWalletAddress
  | SetWalletConnected
  | SetWalletConnecting
  | SetWalletDisconnected
  | SetCheckoutResult
  | ResetCheckoutResult;

export type StoreAction = {
  payload: StoreActionPayload;
};

// eslint-disable-next-line no-unused-vars
type Reducer<S, A> = (prevState: S, action: A) => S;

export const StoreReducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (action.payload.type) {
    case 'SET_TOGGLE_WALLET_OPEN':
      return { ...state, walletOpen: action.payload.open };
    case 'SET_WALLET_ADDRESS':
      return { ...state, walletAddress: action.payload.address };
    case 'SET_WALLET_CONNECTED':
      return { ...state, connected: action.payload.connected };
    case 'SET_WALLET_CONNECTING':
      return { ...state, connecting: action.payload.connecting };
    case 'SET_WALLET_DISCONNECTED':
      return { ...state, connecting: false, connected: false, walletAddress: undefined };
    case 'SET_CHECKOUT_RESULT':
      const { order, product } = action.payload;
      return { ...state, checkoutResult: { order, product } };
    case 'RESET_CHECKOUT_RESULT':
      return { ...state, checkoutResult: initialStoreState.checkoutResult };
    default:
      return state;
  }
};
