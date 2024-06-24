import { checkout as ImtblCheckout, config as ImtblConfig } from '@imtbl/sdk';

export const SITE_NAME = process.env.STORE_NAME || 'NFTs Shop';

/**
 * Passport configuration
 * https://docs.immutable.com/docs/x/passport/register-application
 */
export const PASSPORT_CONFIG = {
  clientId: process.env.PASSPORT_CLIENT_ID,
  redirectUri: process.env.PASSPORT_REDIRECT_URI,
  logoutRedirectUri: process.env.PASSPORT_LOGOUT_REDIRECT_URI
};

/**
 * Environment
 * @example
 * production will run against zkevm mainnet
 * sandbox will run against zkevm testnet
 */
export const ENVIRONMENT =
  process.env.ENVIRONMENT === 'production'
    ? ImtblConfig.Environment.PRODUCTION
    : ImtblConfig.Environment.SANDBOX;

/**
 * Wallet Connect Configuration
 * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/wallet-connect-integration
 */
export const WALLET_CONNECT_CONFIG: ImtblCheckout.WalletConnectConfig | undefined = !!process.env
  .WALLET_CONNECT_PROJECT_ID
  ? {
      projectId: process.env.WALLET_CONNECT_PROJECT_ID,
      metadata: {
        name: SITE_NAME,
        description: `Buy items on ${SITE_NAME}`,
        icons: [process.env.WALLET_CONNECT_ICON_URL],
        url: process.env.WALLET_CONNECT_URL
      }
    }
  : undefined;
