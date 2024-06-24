/* eslint-disable no-unused-vars */
import { notifyError } from 'lib/utils/errors';
import { Dispatch, ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { StoreAction } from './actions';
import { StoreReducer } from './reducer';
import { StoreState, initialStoreState } from './state';

type StoreContextState = {
  state: StoreState;
  dispatch: Dispatch<StoreAction>;
};

const StoreContext = createContext<StoreContextState>({
  state: initialStoreState,
  dispatch: () => {}
});
StoreContext.displayName = 'StoreContext';

const useStoreValue = (overrides: Partial<StoreState> = {}) => {
  const [state, dispatch] = useReducer(StoreReducer, { ...initialStoreState, ...overrides });
  const values = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return values;
};

export const StoreProvider = ({
  children,
  value = initialStoreState
}: {
  children: ReactNode;
  value?: Partial<StoreState>;
}) => {
  const { state, dispatch } = useStoreValue(value);
  const storeValue = useMemo(
    () => ({
      state: { ...state },
      dispatch
    }),
    [state, dispatch]
  );

  return <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    const error = new Error('useStore must be used within a StoreContext.Provider');
    notifyError(error);
    throw error;
  }
  return [context.state, context.dispatch] as const;
};
