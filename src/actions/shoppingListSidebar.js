
import { loadInventories } from './onlineCheckout';

export const OPEN_SHOPPING_LIST_SIDEBAR = 'OPEN_SHOPPING_LIST_SIDEBAR';
export const CLOSE_SHOPPING_LIST_SIDEBAR = 'CLOSE_SHOPPING_LIST_SIDEBAR';

export const open = () => (dispatch, getState) => {
  const state = getState();

  dispatch({ type: OPEN_SHOPPING_LIST_SIDEBAR });

  if (!state.inventories.isFetched) {
    dispatch(loadInventories());
  }
};

export const close = () => ({
  type: CLOSE_SHOPPING_LIST_SIDEBAR,
});

export default { open, close };
