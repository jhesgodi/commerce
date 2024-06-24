import { walletLs } from 'lib/utils/utils';
import { WidgetsAction } from './actions';
import { WidgetsState } from './state';

// eslint-disable-next-line no-unused-vars
type Reducer<S, A> = (prevState: S, action: A) => S;

export const widgetsReducer: Reducer<WidgetsState, WidgetsAction> = (state, action) => {
  switch (action.payload.type) {
    case 'SET_PROVIDER':
      const withWalletProviderName = 'walletProviderName' in action.payload;

      if (withWalletProviderName) {
        walletLs.providerName.write(action.payload.walletProviderName);
      }

      return {
        ...state,
        provider: action.payload.provider,
        ...(withWalletProviderName && {
          walletProviderName: action.payload.walletProviderName
        })
      };
    case 'SET_FACTORY':
      return { ...state, factory: action.payload.factory };
    case 'SET_WALLET_PROVIDER_NAME':
      walletLs.providerName.write(action.payload.walletProviderName);
      return { ...state, walletProviderName: action.payload.walletProviderName };
    case 'SET_WIDGET':
      return { ...state, ...action.payload.widget };
    case 'SET_PASSPORT':
      return { ...state, passport: action.payload.passport };
    case 'SET_CHECKOUT':
      return { ...state, checkout: action.payload.checkout };
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload.userInfo };
    default:
      return state;
  }
};
