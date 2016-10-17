
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

export default createReducer(initialState, {
  [LOAD_PRODUCTS_SUCCESS]: (state, { payload }) => ({
    entriesOrder: map(payload, 'sourceId'),
    entries: normalizeEntities(payload),
  }),

  [LOAD_PRODUCT_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    entries: {
      ...state.entries,
      [payload.sourceId]: {
        ...state.entries[payload.sourceId],
        details: payload,
      },
    },
  }),
});
