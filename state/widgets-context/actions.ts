import { UserInfo } from 'state/hooks/use-imtbl-passport-client';
import { AtLeastOne } from 'state/types';
import { Widgets, WidgetsState } from './state';

type SetProviderPayload = {
  type: 'SET_PROVIDER';
  provider: WidgetsState['provider'];
  walletProviderName?: WidgetsState['walletProviderName'];
};

type SetFactoryPayload = {
  type: 'SET_FACTORY';
  factory: WidgetsState['factory'];
};

type SetWalletProviderNamePayload = {
  type: 'SET_WALLET_PROVIDER_NAME';
  walletProviderName: WidgetsState['walletProviderName'];
};

type SetWidgetPayload = {
  type: 'SET_WIDGET';
  widget: AtLeastOne<Widgets>;
};

type SetPassport = {
  type: 'SET_PASSPORT';
  passport: WidgetsState['passport'];
};

type SetCheckout = {
  type: 'SET_CHECKOUT';
  checkout: WidgetsState['checkout'];
};

type SetUserInfo = {
  type: 'SET_USER_INFO';
  userInfo: UserInfo;
};

type WidgetsActionPayload =
  | SetProviderPayload
  | SetFactoryPayload
  | SetWalletProviderNamePayload
  | SetWidgetPayload
  | SetPassport
  | SetCheckout
  | SetUserInfo;

export type WidgetsAction = {
  payload: WidgetsActionPayload;
};
