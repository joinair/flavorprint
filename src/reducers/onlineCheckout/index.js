/* eslint no-param-reassign:0 */

import assign from 'lodash/assign';
import map from 'lodash/map';
import merge from 'lodash/merge';
import reject from 'lodash/reject';

import createReducer from 'helpers/createReducer';

import {
  LOAD_ONLINE_CHECKOUT_ITEMS_REQUEST,
  LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS,
  CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_REQUEST,
  CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_FAILURE,
  CHECK_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS,
  SELECT_ONLINE_CHECKOUT_ITEM_OPTION_REQUEST,
} from 'actions/onlineCheckout';

import {
  PEAPOD_OAUTH_SUCCESS,
} from 'actions/peapod';

import {
  ADD_SHOPPING_LIST_ITEM,
} from 'actions/shoppingList';

import getQuantity from './helpers/getQuantity';
import changeQuantity from './handlers/changeQuantity';

const initialState = {
  inventory: {},
  items: [],

  isFetching: false,
  hasCredentials: false,
};

const handlers = {
  [LOAD_ONLINE_CHECKOUT_ITEMS_REQUEST]: (state, action) =>
    assign({}, state, {
      inventory: action.payload.inventory,
      isFetching: true,
    }),

  [LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS]: (state, action) =>
    assign({}, state, {
      inventory: action.payload.inventory,
      items: action.payload.items,
      isFetching: false,
    }),

  [CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_REQUEST]: changeQuantity(),
  [CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_FAILURE]: changeQuantity(true),

  [CHECK_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS]: (state, action) =>
    assign({}, state, { hasCredentials: !!action.payload.userInfo }),

  [PEAPOD_OAUTH_SUCCESS]: (state, action) =>
    assign({}, state, { hasCredentials: !!action.payload.userInfo }),

  [SELECT_ONLINE_CHECKOUT_ITEM_OPTION_REQUEST]: (state, action) => {
    const items = map(state.items, item => {
      if (item.id !== action.payload.itemId) { return item; }

      const siDecision = merge({}, action.payload.option, {
        qty: {
          value: getQuantity(item.siDecision || action.payload.option),
        },
      });

      return assign({}, item, { siDecision });
    });

    return assign({}, state, { items });
  },

  [ADD_SHOPPING_LIST_ITEM]: (state, action) => {
    const { createdAt, extra, text } = action.payload;
    const key = { text };
    const items = reject(state.items, item =>
      item.key.text === text && !item.key.recipe);

    if (state.items.length !== items.length) { return state; }

    const item = assign({ key, createdAt }, extra);
    return assign({}, state, { items: items.concat(item) });
  },
};

export default createReducer(initialState, handlers);
