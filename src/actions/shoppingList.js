
import assign from 'lodash/assign';

import Rx from 'rx';
import uuid from 'uuid';

import { API_CALL } from 'middleware/API';

import generateClientId from 'helpers/generateClientId';

export const ADD_SHOPPING_LIST_ITEM = 'ADD_SHOPPING_LIST_ITEM';
export const CHECK_SHOPPING_LIST_ITEM = 'CHECK_SHOPPING_LIST_ITEM';
export const EDIT_SHOPPING_LIST_ITEM = 'EDIT_SHOPPING_LIST_ITEM';
export const REMOVE_SHOPPING_LIST_ITEM = 'REMOVE_SHOPPING_LIST_ITEM';
export const UNCHECK_SHOPPING_LIST_ITEM = 'UNCHECK_SHOPPING_LIST_ITEM';

export const CLEAR_SHOPPING_LIST_ITEMS = 'CLEAR_SHOPPING_LIST_ITEMS';

export const CLEAR_CHECKED_SHOPPING_LIST_ITEMS =
  'CLEAR_CHECKED_SHOPPING_LIST_ITEMS';

export const ADD_SHOPPING_LIST_RECIPE = 'ADD_SHOPPING_LIST_RECIPE';
export const REMOVE_SHOPPING_LIST_RECIPE = 'REMOVE_SHOPPING_LIST_RECIPE';

export const LOAD_SHOPPING_LIST_OPERATIONS_REQUEST =
  'LOAD_SHOPPING_LIST_OPERATIONS_REQUEST';

export const LOAD_SHOPPING_LIST_OPERATIONS_SUCCESS =
  'LOAD_SHOPPING_LIST_OPERATIONS_SUCCESS';

export const LOAD_SHOPPING_LIST_OPERATIONS_FAILURE =
  'LOAD_SHOPPING_LIST_OPERATIONS_FAILURE';

export const SEND_SHOPPING_LIST_OPERATIONS_REQUEST =
  'SEND_SHOPPING_LIST_OPERATIONS_REQUEST';

export const SEND_SHOPPING_LIST_OPERATIONS_SUCCESS =
  'SEND_SHOPPING_LIST_OPERATIONS_SUCCESS';

export const SEND_SHOPPING_LIST_OPERATIONS_FAILURE =
  'SEND_SHOPPING_LIST_OPERATIONS_FAILURE';

export const REQUIRE_SHOPPING_LIST_SYNCHRONIZATION =
  'REQUIRE_SHOPPING_LIST_SYNCHRONIZATION';

export const RESTORE_SHOPPING_LIST_OPERATIONS =
  'RESTORE_SHOPPING_LIST_OPERATIONS';

export const LOAD_SHOPPING_LIST_POPULAR_ITEMS_REQUEST =
  'LOAD_SHOPPING_LIST_POPULAR_ITEMS_REQUEST';

export const LOAD_SHOPPING_LIST_POPULAR_ITEMS_SUCCESS =
  'LOAD_SHOPPING_LIST_POPULAR_ITEMS_SUCCESS';

export const LOAD_SHOPPING_LIST_POPULAR_ITEMS_FAILURE =
  'LOAD_SHOPPING_LIST_POPULAR_ITEMS_FAILURE';

export const CHANGE_SHOPPING_LIST_FILTER = 'CHANGE_SHOPPING_LIST_FILTER';

export const SEND_SHOPPING_LIST_REQUEST = 'SEND_SHOPPING_LIST_REQUEST';
export const SEND_SHOPPING_LIST_SUCCESS = 'SEND_SHOPPING_LIST_SUCCESS';
export const SEND_SHOPPING_LIST_FAILURE = 'SEND_SHOPPING_LIST_FAILURE';

export const SHOPPING_LIST_REMOTE_SOURCE = 'SHOPPING_LIST_REMOTE_SOURCE';
export const SHOPPING_LIST_LOCAL_SOURCE = 'SHOPPING_LIST_LOCAL_SOURCE';

const meta = { [REQUIRE_SHOPPING_LIST_SYNCHRONIZATION]: true };

export const addItem = (key, addedFrom, extra = {}, recipe = {}) => ({
  meta: assign({ addedFrom }, meta),
  type: ADD_SHOPPING_LIST_ITEM,
  payload: {
    extra,
    key,
    recipe,

    createdAt: Date.now(),
    uuid: uuid.v4(),
  },
});

export const checkItem = key => ({
  meta,
  type: CHECK_SHOPPING_LIST_ITEM,
  payload: { key, createdAt: Date.now(), uuid: uuid.v4() },
});

export const editItem = (key, text) => ({
  meta,
  type: EDIT_SHOPPING_LIST_ITEM,
  payload: {
    key,
    text,
    createdAt: Date.now(),
    uuid: uuid.v4(),
  },
});

export const removeItem = key => ({
  meta,
  type: REMOVE_SHOPPING_LIST_ITEM,
  payload: { key, createdAt: Date.now() },
});

export const uncheckItem = key => ({
  meta,
  type: UNCHECK_SHOPPING_LIST_ITEM,
  payload: { key, createdAt: Date.now(), uuid: uuid.v4() },
});

export const clearItems = () => ({
  meta,
  type: CLEAR_SHOPPING_LIST_ITEMS,
  payload: { createdAt: Date.now() },
});

export const clearCheckedItems = () => ({
  meta,
  type: CLEAR_CHECKED_SHOPPING_LIST_ITEMS,
  payload: { createdAt: Date.now() },
});

export const addRecipe = (recipe = {}) => ({
  meta: assign({ addedFrom: 'Recipe View' }, meta),
  type: ADD_SHOPPING_LIST_RECIPE,
  payload: { recipe, createdAt: Date.now(), uuid: uuid.v4() },
});

export const removeRecipe = id => ({
  meta,
  type: REMOVE_SHOPPING_LIST_RECIPE,
  payload: { id, createdAt: Date.now() },
});

export const loadOperations = () => (dispatch, getState) => {
  const state = getState();
  const { operationSyncId } = state.shoppingList;

  if (!state.user.JWTHeader) {
    return Rx.Observable.empty();
  }

  return dispatch({
    payload: {
      replaceShoppingList: !operationSyncId,
    },

    [API_CALL]: {
      endpoint: '/checklist',
      query: {
        clientId: global.Platform.OS === 'node' ? undefined : generateClientId(),
        operationSyncId,
      },
      types: [
        LOAD_SHOPPING_LIST_OPERATIONS_REQUEST,
        LOAD_SHOPPING_LIST_OPERATIONS_SUCCESS,
        LOAD_SHOPPING_LIST_OPERATIONS_FAILURE,
      ],
    },
  });
};

export const sendOperations = () => (dispatch, getState) => {
  const state = getState();
  const { operations } = state.shoppingList;

  if (!state.user.JWTHeader) {
    return Rx.Observable.empty();
  }

  return dispatch({
    [API_CALL]: {
      endpoint: '/checklist',
      method: 'POST',
      query: {
        clientId: generateClientId(),
        operations,
      },
      types: [
        SEND_SHOPPING_LIST_OPERATIONS_REQUEST,
        SEND_SHOPPING_LIST_OPERATIONS_SUCCESS,
        SEND_SHOPPING_LIST_OPERATIONS_FAILURE,
      ],
    },
  });
};

export const restoreOperations = operations => ({
  meta,
  type: RESTORE_SHOPPING_LIST_OPERATIONS,
  payload: { operations },
});

export const loadPopularItems = () => ({
  [API_CALL]: {
    endpoint: '/checklist/popular_items',
    query: { language: 'en' },
    types: [
      LOAD_SHOPPING_LIST_POPULAR_ITEMS_REQUEST,
      LOAD_SHOPPING_LIST_POPULAR_ITEMS_SUCCESS,
      LOAD_SHOPPING_LIST_POPULAR_ITEMS_FAILURE,
    ],
  },
});

export const changeFilter = filter => ({
  type: CHANGE_SHOPPING_LIST_FILTER,
  payload: { filter },
});

export const send = (email, ordering) => ({
  [API_CALL]: {
    endpoint: '/checklist/email',
    method: 'POST',
    query: { email, ordering },
    types: [
      SEND_SHOPPING_LIST_REQUEST,
      SEND_SHOPPING_LIST_SUCCESS,
      SEND_SHOPPING_LIST_FAILURE,
    ],
  },
});

export default {
  addItem,
  checkItem,
  editItem,
  removeItem,
  uncheckItem,

  clearItems,
  clearCheckedItems,

  addRecipe,
  removeRecipe,

  loadOperations,
  sendOperations,
  restoreOperations,

  loadPopularItems,

  changeFilter,

  send,
};
