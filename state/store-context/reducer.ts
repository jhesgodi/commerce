import { StoreAction } from './actions';
import { StoreState, initialStoreState } from './state';

// eslint-disable-next-line no-unused-vars
type Reducer<S, A> = (prevState: S, action: A) => S;

export const StoreReducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (action.payload.type) {
    case 'SET_TOGGLE_WALLET_OPEN':
      return { ...state, walletOpen: action.payload.open };
    case 'SET_WALLET_ADDRESS':
      return { ...state, walletAddress: action.payload.address };
    case 'SET_WALLET_CONNECTED':
      return { ...state, connected: action.payload.connected };
    case 'SET_WALLET_CONNECTING':
      return { ...state, connecting: action.payload.connecting };
    case 'SET_WALLET_DISCONNECTED':
      return { ...state, connecting: false, connected: false, walletAddress: undefined };
    case 'SET_CHECKOUT_RESULT':
      const { order, product } = action.payload;
      return { ...state, checkoutResult: { order, product } };
    case 'SET_CART_PROCESSING':
      return { ...state, cartProcessing: action.payload.processing };
    case 'RESET_CHECKOUT_RESULT':
      return { ...state, checkoutResult: initialStoreState.checkoutResult };
    case 'SET_TOGGLE_CART_OPEN':
      return { ...state, cartOpen: action.payload.open };
    case 'ADD_ITEM_TO_CART': {
      const { item } = action.payload;

      const existingItem = state.cartItems.find(({ productId }) => productId === item.productId);

      if (!existingItem) {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

      const newQty =
        item.qty +
        (state.cartItems.find(({ productId }) => productId === item.productId)?.qty || 0);

      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(({ productId }) => productId !== item.productId),
          { ...item, qty: newQty }
        ]
      };
    }
    case 'REMOVE_ITEM_FROM_CART': {
      const { id } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(({ productId }) => productId !== id)
      };
    }
    case 'UPDATE_ITEM_QTY': {
      const { id, qty } = action.payload;
      const indexAt = state.cartItems.findIndex(({ productId }) => productId === id);

      if (indexAt === -1) {
        return state;
      }

      const item = state.cartItems[indexAt]!;
      const newQty = item.qty + qty;

      if (newQty <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(({ productId }) => productId !== id)
        };
      }

      const items = [...state.cartItems];
      items.splice(indexAt, 1, { ...item, qty: newQty });

      return { ...state, cartItems: items };
    }
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    default:
  }
};
