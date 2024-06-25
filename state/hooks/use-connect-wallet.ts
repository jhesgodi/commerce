import { checkout as ImtblCheckout } from '@imtbl/sdk';
import { notifyError } from 'lib/utils/errors';
import { walletLs } from 'lib/utils/utils';
import { useCallback, useEffect } from 'react';
import { WIDGETS_MOUNT_ROOT_ID } from 'state/config/const';
import { useStore } from 'state/store-context';
import { useWidgets } from 'state/widgets-context';

/**
 * Orchestrates connecting and disconnecting wallet
 * using Immutable checkout widgets
 * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/connect
 */
export const useConnectWallet = () => {
  const context = useWidgets();
  const [{ checkout, provider, walletProviderName, connectWidget }, widgetsDispatch] = context;
  const [{ walletAddress, connected }, storeDispatch] = useStore();

  const connectFromWalletProviderName = useCallback(
    async (
      walletProviderName: ImtblCheckout.WalletProviderName,
      onSuccess?: () => void,
      onError?: () => void
    ) => {
      if (!checkout) return;

      walletLs.connecting.write(true);

      try {
        storeDispatch({ payload: { type: 'SET_WALLET_CONNECTING', connecting: true } });
        const { provider: web3Provider } = await checkout.createProvider({
          walletProviderName
        });
        await checkout.connect({ provider: web3Provider });
        const { walletAddress } = await checkout.checkIsWalletConnected({
          provider: web3Provider
        });

        widgetsDispatch({
          payload: { type: 'SET_PROVIDER', provider: web3Provider, walletProviderName }
        });
        storeDispatch({ payload: { type: 'SET_WALLET_CONNECTED', connected: true } });
        storeDispatch({ payload: { type: 'SET_WALLET_ADDRESS', address: walletAddress } });
        onSuccess?.();
      } catch (err) {
        onError?.();
        notifyError(err);
        storeDispatch({ payload: { type: 'SET_WALLET_CONNECTED', connected: false } });
      } finally {
        storeDispatch({ payload: { type: 'SET_WALLET_CONNECTING', connecting: false } });
        walletLs.connecting.write(false);
      }
    },
    [checkout, widgetsDispatch, storeDispatch]
  );

  const handleConnectWallet = (
    providerName?: ImtblCheckout.WalletProviderName,
    onSuccess?: () => void
  ) => {
    if (providerName) {
      connectFromWalletProviderName(providerName, onSuccess);
      return;
    }

    if (!connectWidget) return;

    storeDispatch({ payload: { type: 'SET_WALLET_CONNECTING', connecting: true } });
    connectWidget?.mount(WIDGETS_MOUNT_ROOT_ID);
  };

  const handleDisconnectWallet = useCallback(() => {
    connectWidget?.unmount();
    storeDispatch({ payload: { type: 'SET_WALLET_CONNECTING', connecting: false } });
  }, [connectWidget, storeDispatch]);

  useEffect(() => {
    // on page refresh, reconnect wallet previously connected
    const reconnecting = walletLs.connecting.read();
    const walletProviderName = walletLs.providerName.read();

    if ((!walletProviderName || !checkout || provider) && reconnecting) {
      walletLs.connecting.write(false);
      return;
    }
    if (!walletProviderName || !checkout || provider || reconnecting) return;

    connectFromWalletProviderName(walletProviderName);
  }, [checkout, provider, connectFromWalletProviderName]);

  useEffect(() => {
    // reset after wallet is disconnected
    if (!provider && !walletProviderName) {
      storeDispatch({ payload: { type: 'SET_WALLET_DISCONNECTED' } });
    }
  }, [provider, walletProviderName, connected, storeDispatch]);

  useEffect(() => {
    // retrieve wallet address after wallet is connected
    if (!provider || !checkout || walletAddress) return;

    (async () => {
      try {
        const { walletAddress } = await checkout.checkIsWalletConnected({ provider });
        storeDispatch({ payload: { type: 'SET_WALLET_ADDRESS', address: walletAddress } });
      } catch (err) {
        notifyError(err);
      }
    })();
  }, [provider, checkout, walletAddress, storeDispatch]);

  useEffect(() => {
    // handle connect widget events
    if (!connectWidget) return;

    connectWidget.addListener(ImtblCheckout.ConnectEventType.CLOSE_WIDGET, () => {
      handleDisconnectWallet();
    });

    connectWidget.addListener(
      ImtblCheckout.ConnectEventType.SUCCESS,
      (payload: ImtblCheckout.ConnectionSuccess) => {
        widgetsDispatch({
          payload: {
            type: 'SET_PROVIDER',
            provider: payload.provider,
            walletProviderName: payload.walletProviderName
          }
        });
        storeDispatch({ payload: { type: 'SET_WALLET_CONNECTED', connected: true } });
        storeDispatch({ payload: { type: 'SET_WALLET_CONNECTING', connecting: false } });
      }
    );

    return () => {
      connectWidget.removeListener(ImtblCheckout.ConnectEventType.CLOSE_WIDGET);
      connectWidget.removeListener(ImtblCheckout.ConnectEventType.SUCCESS);
    };
  }, [connectWidget, widgetsDispatch, storeDispatch, handleDisconnectWallet]);

  return {
    connectWallet: handleConnectWallet,
    disconnectWallet: handleDisconnectWallet
  };
};
