/* eslint-disable no-unused-vars */
import { checkout as ImtblCheckout } from '@imtbl/sdk';
import { Dispatch, ReactNode, createContext, useEffect, useMemo, useReducer } from 'react';
import {
  ENVIRONMENT as environment,
  WALLET_CONNECT_CONFIG as walletConnect
} from 'state/config/envs';

import { notifyError } from 'lib/utils/errors';
import { useImtblCheckoutClient, useImtblPassportClient } from 'state/hooks';
import { WidgetsAction } from './actions';
import { widgetsReducer } from './reducer';
import { WidgetsState, intialWidgetsState } from './state';

type WidgetsContextState = {
  state: WidgetsState;
  dispatch: Dispatch<WidgetsAction>;
};

export const WidgetsContext = createContext<WidgetsContextState>({
  state: intialWidgetsState,
  dispatch: () => {}
});

WidgetsContext.displayName = 'WidgetsContext';

export const useWidgetsValue = (overrides: Partial<WidgetsState> = {}) => {
  const [state, dispatch] = useReducer(widgetsReducer, { ...intialWidgetsState, ...overrides });
  const values = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return values;
};

export const WidgetsProvider = ({ children }: { children: ReactNode }) => {
  const widgetsValue = useWidgetsValue();
  const {
    state: { factory, provider },
    dispatch
  } = widgetsValue;
  const passportInstance = useImtblPassportClient({ environment });
  const checkoutInstance = useImtblCheckoutClient({ passport: passportInstance, environment });

  useEffect(() => {
    // create widgets factory and set passport & checkout instances
    if (!dispatch || !passportInstance || !checkoutInstance) return;

    (async () => {
      try {
        const widgetsFactory = await checkoutInstance.widgets({
          config: {
            theme: ImtblCheckout.WidgetTheme.DARK,
            walletConnect
          }
        });
        dispatch({ payload: { type: 'SET_FACTORY', factory: widgetsFactory } });
        dispatch({ payload: { type: 'SET_PASSPORT', passport: passportInstance } });
        dispatch({ payload: { type: 'SET_CHECKOUT', checkout: checkoutInstance } });
      } catch (err) {
        notifyError(err);
      }
    })();
  }, [dispatch, passportInstance, checkoutInstance]);

  useEffect(() => {
    // forecast provider changed after reconnecting wallet
    if (!factory || !factory.updateProvider || !provider) return;
    factory.updateProvider(provider);
  }, [factory, provider]);

  useEffect(() => {
    // update user info if after provider changed to passport wallet
    if (!(provider?.provider as any)?.isPassport || !passportInstance) return;

    (async () => {
      const userInfo = await passportInstance.getUserInfo();
      dispatch({ payload: { type: 'SET_USER_INFO', userInfo } });
    })();
  }, [provider, passportInstance, dispatch]);

  return <WidgetsContext.Provider value={widgetsValue}>{children}</WidgetsContext.Provider>;
};
