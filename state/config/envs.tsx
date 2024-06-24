'use client';

import { checkout as ImtblCheckout, config as ImtblConfig } from '@imtbl/sdk';

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || '<Shop>';

/**
 * Environment
 * @example
 * production will run against zkevm mainnet
 * sandbox will run against zkevm testnet
 */
export const ENVIRONMENT =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
    ? ImtblConfig.Environment.PRODUCTION
    : ImtblConfig.Environment.SANDBOX;

/**
 * Passport configuration
 * https://docs.immutable.com/docs/x/passport/register-application
 */
export const PASSPORT_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PASSPORT_CLIENT_ID!,
  redirectUri: process.env.NEXT_PUBLIC_PASSPORT_REDIRECT_URI!,
  logoutRedirectUri: process.env.NEXT_PUBLIC_PASSPORT_LOGOUT_REDIRECT_URI!
};

/**
 * Wallet Connect Configuration
 * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/wallet-connect-integration
 */
export const WALLET_CONNECT_CONFIG: ImtblCheckout.WalletConnectConfig | undefined = !!process.env
  .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
  ? {
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      metadata: {
        name: SITE_NAME,
        description: `Buy items on ${SITE_NAME}`,
        icons: [process.env.NEXT_PUBLIC_WALLET_CONNECT_ICON_URL!],
        url: process.env.NEXT_PUBLIC_WALLET_CONNECT_URL!
      }
    }
  : undefined;
