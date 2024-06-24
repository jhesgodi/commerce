/* eslint-disable no-unused-vars */
import { checkout as ImtblCheckout } from '@imtbl/sdk';
import { Product } from 'lib/types';

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
