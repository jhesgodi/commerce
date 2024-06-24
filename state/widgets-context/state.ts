/* eslint-disable no-unused-vars */
import { checkout as ImtblCheckout, passport as ImtblPassport } from '@imtbl/sdk';

import { Web3Provider } from '@ethersproject/providers';
import { UserInfo } from 'state/hooks';

export type Widgets = {
  /**
   * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/connect
   */
  connectWidget: ImtblCheckout.Widget<typeof ImtblCheckout.WidgetType.CONNECT>;
  /**
   * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/wallet
   */
  walletWidget: ImtblCheckout.Widget<typeof ImtblCheckout.WidgetType.WALLET>;
  /**
   * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/swap
   */
  swapWidget: ImtblCheckout.Widget<typeof ImtblCheckout.WidgetType.SWAP>;
  /**
   * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/bridge
   */
  bridgeWidget: ImtblCheckout.Widget<typeof ImtblCheckout.WidgetType.BRIDGE>;
  /**
   * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/onramp
   */
  onRampWidget: ImtblCheckout.Widget<typeof ImtblCheckout.WidgetType.ONRAMP>;
  /**
   * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/primary-sales
   */
  saleWidget: ImtblCheckout.Widget<typeof ImtblCheckout.WidgetType.SALE>;
};

export type WidgetsState = {
  /**
   * Imtbl Passport Client Instance
   */
  passport: ImtblPassport.Passport | undefined;
  /**
   * Imtbl Checkout SDK Instance
   */
  checkout: ImtblCheckout.Checkout | undefined;
  /**
   * Imtbl Checkout Widgets Factory
   * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/setup#widget-factory
   */
  factory: ImmutableCheckoutWidgets.WidgetsFactory | undefined;
  /**
   * Connected Wallet Web3Provider
   */
  provider: Web3Provider | undefined;
  /**
   * Passport User Info
   */
  userInfo: UserInfo;
  /**
   * Connected Wallet Provider Name (ie: 'metamask', 'passport', 'walletconnect')
   */
  walletProviderName: ImtblCheckout.WalletProviderName | undefined;
} & Partial<Widgets>;

export const intialWidgetsState: WidgetsState = {
  provider: undefined,
  passport: undefined,
  checkout: undefined,
  factory: undefined,
  connectWidget: undefined,
  walletWidget: undefined,
  swapWidget: undefined,
  bridgeWidget: undefined,
  onRampWidget: undefined,
  saleWidget: undefined,
  userInfo: undefined,
  walletProviderName: undefined
};
