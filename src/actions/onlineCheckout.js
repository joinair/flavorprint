
import assign from 'lodash/assign';

import { API_CALL } from 'middleware/API';

import getQuantity from 'reducers/onlineCheckout/helpers/getQuantity';

import { inventoryToId } from 'helpers/inventories';

import modal from 'actions/modal';
import router from 'actions/router';

import { SEND_ITEMS_TO_INVENTORY, SEND_ITEMS_TO_PEAPOD } from 'constants/Modals';
import { CHECKOUT_INVENTORY } from 'constants/QueryParams';

export const LOAD_ONLINE_CHECKOUT_ITEMS_REQUEST =
  'LOAD_ONLINE_CHECKOUT_ITEMS_REQUEST';

export const LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS =
  'LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS';

export const LOAD_ONLINE_CHECKOUT_ITEMS_FAILURE =
  'LOAD_ONLINE_CHECKOUT_ITEMS_FAILURE';

export const LOAD_ONLINE_CHECKOUT_INVENTORIES_REQUEST =
  'LOAD_ONLINE_CHECKOUT_INVENTORIES_REQUEST';

export const LOAD_ONLINE_CHECKOUT_INVENTORIES_SUCCESS =
  'LOAD_ONLINE_CHECKOUT_INVENTORIES_SUCCESS';

export const LOAD_ONLINE_CHECKOUT_INVENTORIES_FAILURE =
  'LOAD_ONLINE_CHECKOUT_INVENTORIES_FAILURE';

export const CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_REQUEST =
  'CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_REQUEST';

export const CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_SUCCESS =
  'CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_SUCCESS';

export const CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_FAILURE =
  'CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_FAILURE';

export const CHECK_ONLINE_CHECKOUT_CREDENTIALS_REQUEST =
  'CHECK_ONLINE_CHECKOUT_CREDENTIALS_REQUEST';

export const CHECK_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS =
  'CHECK_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS';

export const CHECK_ONLINE_CHECKOUT_CREDENTIALS_FAILURE =
  'CHECK_ONLINE_CHECKOUT_CREDENTIALS_FAILURE';

export const SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_REQUEST =
  'SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_REQUEST';

export const SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS =
  'SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS';

export const SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_FAILURE =
  'SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_FAILURE';

export const SEND_ONLINE_CHECKOUT_ITEMS_REQUEST =
  'SEND_ONLINE_CHECKOUT_ITEMS_REQUEST';

export const SEND_ONLINE_CHECKOUT_ITEMS_SUCCESS =
  'SEND_ONLINE_CHECKOUT_ITEMS_SUCCESS';

export const SEND_ONLINE_CHECKOUT_ITEMS_FAILURE =
  'SEND_ONLINE_CHECKOUT_ITEMS_FAILURE';

export const LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_REQUEST =
  'LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_REQUEST';

export const LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_SUCCESS =
  'LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_SUCCESS';

export const LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_FAILURE =
  'LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_FAILURE';

export const SELECT_ONLINE_CHECKOUT_ITEM_OPTION_REQUEST =
  'SELECT_ONLINE_CHECKOUT_ITEM_OPTION_REQUEST';

export const SELECT_ONLINE_CHECKOUT_ITEM_OPTION_SUCCESS =
  'SELECT_ONLINE_CHECKOUT_ITEM_OPTION_SUCCESS';

export const SELECT_ONLINE_CHECKOUT_ITEM_OPTION_FAILURE =
  'SELECT_ONLINE_CHECKOUT_ITEM_OPTION_FAILURE';

export const SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_REQUEST =
  'SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_REQUEST';

export const SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_SUCCESS =
  'SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_SUCCESS';

export const SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_FAILURE =
  'SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_FAILURE';

export const loadItems = inventory => (dispatch, getState) => {
  const store = inventory || getState().onlineCheckout.inventory;
  const id = inventoryToId(inventory);

  return dispatch({
    payload: { inventory: store },

    [API_CALL]: {
      endpoint: '/storeitemlist',
      query: { inventory: id },
      types: [
        LOAD_ONLINE_CHECKOUT_ITEMS_REQUEST,
        LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS,
        LOAD_ONLINE_CHECKOUT_ITEMS_FAILURE,
      ],
    },
  });
};

export const loadInventories = () => ({
  [API_CALL]: {
    endpoint: '/inventories',
    types: [
      LOAD_ONLINE_CHECKOUT_INVENTORIES_REQUEST,
      LOAD_ONLINE_CHECKOUT_INVENTORIES_SUCCESS,
      LOAD_ONLINE_CHECKOUT_INVENTORIES_FAILURE,
    ],
  },
});

export const selectItemOption =
  (item, option) => (dispatch, getState) =>
    dispatch({
      payload: { option, itemId: item.id },

      [API_CALL]: {
        endpoint: `/storeitemlist/${item.id}/decide`,
        method: 'POST',
        query: {
          key: item.key,
          inventory: getState().onlineCheckout.inventory,
          itemId: item.id,
          decision: {
            sku: option.item.sku,
            qty: {
              selectorType: option.qty.selectorType,
              value: getQuantity(item.siDecision || option),
            },
            decision: option.decision,
          },
        },
        types: [
          SELECT_ONLINE_CHECKOUT_ITEM_OPTION_REQUEST,
          SELECT_ONLINE_CHECKOUT_ITEM_OPTION_SUCCESS,
          SELECT_ONLINE_CHECKOUT_ITEM_OPTION_FAILURE,
        ],
      },
    });

export const changeItemQuantity =
  (item, quantity) => (dispatch, getState) => {
    const { inventory } = getState().onlineCheckout;
    const { id, key, siDecision } = item;

    return dispatch({
      payload: {
        itemId: id,
        quantityDelta: quantity - siDecision.qty.value,
      },

      [API_CALL]: {
        endpoint: `/storeitemlist/${id}/decide`,
        method: 'POST',
        query: {
          key,
          inventory,
          itemId: id,
          decision: {
            sku: siDecision.item.sku,
            qty: {
              selectorType: siDecision.qty.selectorType,
              value: quantity,
            },
            decision: 'Add',
          },
        },
        types: [
          CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_REQUEST,
          CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_SUCCESS,
          CHANGE_ONLINE_CHECKOUT_ITEM_QUANTITY_FAILURE,
        ],
      },
    });
  };

export const checkCredentials = id => ({
  [API_CALL]: {
    endpoint: `/inventories/credentials/${id}`,
    types: [
      CHECK_ONLINE_CHECKOUT_CREDENTIALS_REQUEST,
      CHECK_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS,
      CHECK_ONLINE_CHECKOUT_CREDENTIALS_FAILURE,
    ],
  },
});

export const submitCredentials = (id, credentials) => ({
  [API_CALL]: {
    endpoint: `/inventories/credentials/${id}`,
    method: 'POST',
    query: credentials,
    types: [
      SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_REQUEST,
      SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_SUCCESS,
      SUBMIT_ONLINE_CHECKOUT_CREDENTIALS_FAILURE,
    ],
  },
});

export const sendItems = inventory => ({
  [API_CALL]: {
    endpoint: '/inventories/checkout',
    method: 'POST',
    query: { inventory },
    types: [
      SEND_ONLINE_CHECKOUT_ITEMS_REQUEST,
      SEND_ONLINE_CHECKOUT_ITEMS_SUCCESS,
      SEND_ONLINE_CHECKOUT_ITEMS_FAILURE,
    ],
  },
});

export const loadItemOptions =
  (id, params) => (dispatch, getState) => {
    const inventory = inventoryToId(
      getState().onlineCheckout.inventory
    );

    return dispatch({
      [API_CALL]: {
        endpoint: `/storeitemlist/${id}/options`,
        query: assign({}, params, { inventory }),
        types: [
          LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_REQUEST,
          LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_SUCCESS,
          LOAD_ONLINE_CHECKOUT_ITEM_OPTIONS_FAILURE,
        ],
      },
    });
  };

export const searchItemOptions =
  (term, params) => (dispatch, getState) => {
    const inventory = inventoryToId(
      getState().onlineCheckout.inventory
    );

    return dispatch({
      [API_CALL]: {
        endpoint: '/storeitemlist/_search',
        query: assign({}, params, { term, inventory }),
        types: [
          SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_REQUEST,
          SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_SUCCESS,
          SEARCH_ONLINE_CHECKOUT_ITEM_OPTIONS_FAILURE,
        ],
      },
    });
  };

export const startSendingItems = () => (dispatch, getState) => {
  const inventory = getState().onlineCheckout.inventory;

  dispatch(
    modal.open(
      inventory.name === 'Peapod'
        ? SEND_ITEMS_TO_PEAPOD
        : SEND_ITEMS_TO_INVENTORY
    )
  );
};

export const selectInventory = inventory => (dispatch, getState) => {
  const { query, pathname } = getState().router.location;

  dispatch(
    router.replace(
      pathname,
      assign({}, query, {
        [CHECKOUT_INVENTORY]: inventoryToId(inventory),
      })
    )
  );
};

export default {
  loadInventories,

  sendItems,
  loadItems,

  loadItemOptions,
  selectItemOption,
  searchItemOptions,
  changeItemQuantity,

  checkCredentials,
  submitCredentials,

  startSendingItems,
  selectInventory,
};
