
import assign from 'lodash/assign';
import map from 'lodash/map';
import uniq from 'lodash/uniq';

import createReducer from 'helpers/createReducer';
import { normalizeEntities } from 'helpers/reducer';

import {
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_MORE_SUCCESS,
  LOAD_PRODUCT_DETAILS_SUCCESS,
} from 'actions/products';

const initialState = {
  entries: {},
  entriesOrder: [],
  canRequestNext: true,
};

const handlers = assign({
  [LOAD_PRODUCTS_SUCCESS]: (state, action) => ({
    entriesOrder: map(action.payload, item => item.itemId),
    entries: normalizeEntities(action.payload),
    canRequestNext: true,
  }),

  [LOAD_PRODUCTS_MORE_SUCCESS]: (state, action) => ({
    entriesOrder: uniq([
      ...state.entriesOrder,
      ...map(action.payload, item => item.itemId),
    ]),
    entries: {
      ...state.entries,
      ...normalizeEntities(action.payload),
    },
    canRequestNext: !!action.payload && action.payload.length > 0,
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
