
import createReducer from 'helpers/createReducer';

import {
  ROUTER_DID_CHANGE,
} from 'actions/router';

import {
  OPEN_SHOPPING_LIST_SIDEBAR,
  CLOSE_SHOPPING_LIST_SIDEBAR,
} from 'actions/shoppingListSidebar';

const initialState = {
  isOpen: false,
};

const handlers = {
  [OPEN_SHOPPING_LIST_SIDEBAR]: () => ({ isOpen: true }),
  [CLOSE_SHOPPING_LIST_SIDEBAR]: () => ({ isOpen: false }),

  [ROUTER_DID_CHANGE]: (state, action) =>
    action.payload.synthetic || !state.isOpen
      ? state
      : { isOpen: false },
};

export default createReducer(initialState, handlers);
