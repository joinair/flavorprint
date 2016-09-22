
import createReducer from 'helpers/createReducer';

import {
  LOAD_ONLINE_CHECKOUT_INVENTORIES_SUCCESS,
} from 'actions/onlineCheckout';

const initialState = {
  isFetched: false,
  entries: [],
};

const handlers = {
  [LOAD_ONLINE_CHECKOUT_INVENTORIES_SUCCESS]: (state, action) => ({
    isFetched: true,
    entries: action.payload.inventories,
  }),
};

export default createReducer(initialState, handlers);
