
import assign from 'lodash/assign';
import map from 'lodash/map';

import createReducer from 'helpers/createReducer';
import { normalizeEntities } from 'helpers/reducer';

import {
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCT_DETAILS_SUCCESS,
} from 'actions/products';

const initialState = {
  entries: {},
  entriesOrder: [],
};

const handlers = assign({
  [LOAD_PRODUCTS_SUCCESS]: (state, action) => ({
    entriesOrder: map(action.payload, item => item.itemId),
    entries: normalizeEntities(action.payload),
  }),

  [LOAD_PRODUCT_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    entries: {
      ...state.entries,
      [payload.productId]: {
        ...state.entries[payload.productId],
        details: payload,
      },
    },
  }),
});

export default createReducer(initialState, handlers);
