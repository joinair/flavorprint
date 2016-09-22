/* eslint no-param-reassign:0 */

import reduce from 'lodash/reduce';

import createReducer from 'helpers/createReducer';

import { LOAD_POPULAR_PRODUCTS_SUCCESS } from 'actions/preferences';

const initialState = {
  isFetched: false,
  entries: {},
};

const handlers = {
  [LOAD_POPULAR_PRODUCTS_SUCCESS]: (state_, action) => ({
    isFetched: true,
    entries: reduce(
      action.payload.values,
      (result, product) => {
        result[product.text] = product;
        return result;
      },
      {}
    ),
  }),
};

export default createReducer(initialState, handlers);
