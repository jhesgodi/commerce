import { checkout as ImtblCheckout } from '@imtbl/sdk';
import { notifyError } from 'lib/utils/errors';
import { useCallback, useEffect, useState } from 'react';
import { WIDGETS_MOUNT_ROOT_ID } from 'state/config/const';
import { useStore } from 'state/store-context';
import { useWidgets } from 'state/widgets-context';

type NetworkInfo = Omit<ImtblCheckout.WalletNetworkSwitch, 'provider'>;

/**
 * Orchestrates reading wallet balances and top up tokens by onRamp, Bridge & Swap
 * using Immutable checkout widgets and their events
 * https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/event-orchestration
 */
export const useWalletBalances = () => {
  const [
    {
      checkout,
      provider,
      walletProviderName,
      walletWidget,
      swapWidget,
      bridgeWidget,
      onRampWidget
    },
    widgetsDispatch
  ] = useWidgets();
  const [, storeDispatch] = useStore();
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({ chainId: 0, network: '' });

  /**
   * Close wallet widget
   */
  const handleCloseWallet = useCallback(() => {
    walletWidget?.unmount();
    storeDispatch({ payload: { type: 'SET_TOGGLE_WALLET_OPEN', open: false } });
  }, [walletWidget, storeDispatch]);

  /**
   * Open wallet widget
   */
  const handleOpenWallet = useCallback(() => {
    storeDispatch({ payload: { type: 'SET_TOGGLE_WALLET_OPEN', open: true } });
    walletWidget?.mount(WIDGETS_MOUNT_ROOT_ID);
  }, [walletWidget, storeDispatch]);

  /**
   * Close wallet widget and disconnect wallet
   */
  const handleConnectionClose = useCallback(async () => {
    walletWidget?.unmount();
    storeDispatch({ payload: { type: 'SET_TOGGLE_WALLET_OPEN', open: false } });
    widgetsDispatch({
      payload: { type: 'SET_PROVIDER', provider: undefined, walletProviderName: undefined }
    });

    try {
      if (walletProviderName === ImtblCheckout.WalletProviderName.PASSPORT) {
        await checkout?.passport?.logout();
      }

      if (walletProviderName === ImtblCheckout.WalletProviderName.METAMASK) {
        await provider?.send('wallet_revokePermissions', [{ eth_accounts: {} }]);
      }
    } catch (err) {
      notifyError(err);
    }
  }, [checkout, provider, walletProviderName, walletWidget, widgetsDispatch, storeDispatch]);

  /**
   * Handle network switch
   */
  const handleNetworkSwitch = useCallback(
    ({ provider, chainId, network }: ImtblCheckout.WalletNetworkSwitch) => {
      setNetworkInfo({ chainId, network });
      widgetsDispatch({ payload: { type: 'SET_PROVIDER', provider, walletProviderName } });
    },
    [widgetsDispatch, walletProviderName]
  );

  useEffect(() => {
    // subscribe wallet widget events
    if (!walletWidget || !onRampWidget || !bridgeWidget || !swapWidget) return;

    walletWidget.addListener(ImtblCheckout.WalletEventType.CLOSE_WIDGET, () => {
      handleCloseWallet();
    });

    walletWidget.addListener(ImtblCheckout.WalletEventType.DISCONNECT_WALLET, async () => {
      handleConnectionClose();
    });

    walletWidget.addListener(ImtblCheckout.WalletEventType.NETWORK_SWITCH, (payload) => {
      handleNetworkSwitch(payload);
    });

    // subscribe to wallet widget orchestration events
    // these open/close the other widgets
    walletWidget.addListener(ImtblCheckout.OrchestrationEventType.REQUEST_ONRAMP, () => {
      onRampWidget.mount(WIDGETS_MOUNT_ROOT_ID);
      onRampWidget.addListener(ImtblCheckout.OnRampEventType.CLOSE_WIDGET, () => {
        handleCloseWallet();
        handleOpenWallet();
        onRampWidget.removeListener(ImtblCheckout.OnRampEventType.CLOSE_WIDGET);
      });
    });

    walletWidget.addListener(ImtblCheckout.OrchestrationEventType.REQUEST_SWAP, () => {
      swapWidget.mount(WIDGETS_MOUNT_ROOT_ID);
      swapWidget.addListener(ImtblCheckout.SwapEventType.CLOSE_WIDGET, () => {
        handleCloseWallet();
        swapWidget.unmount();
        handleOpenWallet();
        swapWidget.removeListener(ImtblCheckout.SwapEventType.CLOSE_WIDGET);
      });
    });

    walletWidget.addListener(ImtblCheckout.OrchestrationEventType.REQUEST_BRIDGE, () => {
      bridgeWidget.mount(WIDGETS_MOUNT_ROOT_ID);
      bridgeWidget.addListener(ImtblCheckout.BridgeEventType.CLOSE_WIDGET, () => {
        handleCloseWallet();
        bridgeWidget.unmount();
        handleOpenWallet();
        bridgeWidget.removeListener(ImtblCheckout.BridgeEventType.CLOSE_WIDGET);
      });
    });

    return () => {
      walletWidget?.removeListener(ImtblCheckout.WalletEventType.CLOSE_WIDGET);
      walletWidget?.removeListener(ImtblCheckout.WalletEventType.DISCONNECT_WALLET);
      walletWidget?.removeListener(ImtblCheckout.WalletEventType.NETWORK_SWITCH);
    };
  }, [
    walletWidget,
    onRampWidget,
    bridgeWidget,
    swapWidget,
    handleOpenWallet,
    handleCloseWallet,
    handleConnectionClose,
    handleNetworkSwitch
  ]);

  return {
    networkInfo,
    walletProviderName,
    openWallet: handleOpenWallet,
    closeWallet: handleCloseWallet
  };
};
