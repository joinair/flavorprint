
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import get from 'lodash/get';
import omit from 'lodash/omit';

import itemsWithDecision from 'reducers/onlineCheckout/selectors/itemsWithDecision';

import { CHECKOUT_INVENTORY, REDIRECT_PATH } from 'constants/QueryParams';
import { HOME, ONLINE_CHECKOUT } from 'constants/Routes';

import router from 'actions/router';
import onlineCheckout from 'actions/onlineCheckout';
import peapod from 'actions/peapod';

import OnlineCheckoutHeader from './Header';
import OnlineCheckoutHeaderPeapod from './HeaderPeapod';

const entriesSelector = state => state.inventories.entries;
const inventorySelector = state => state.onlineCheckout.inventory;
const shoppingListSelector = state => state.shoppingList;
const onlineCheckoutSelector = state => state.onlineCheckout;
const isFetchingSelector = state => state.onlineCheckout.isFetching;
const peapodSelector = state => state.peapod;

const itemsSelector = itemsWithDecision(
  onlineCheckoutSelector,
  shoppingListSelector
);

const selector = createStructuredSelector({
  inventory: inventorySelector,
  entries: entriesSelector,
  items: itemsSelector,
  isFetching: isFetchingSelector,
  peapod: peapodSelector,
});

const close = () => (dispatch, getState) => {
  const query = get(getState(), 'router.location.query');
  const redirectPath = get(query, REDIRECT_PATH, HOME);

  dispatch(
    router.push(
      redirectPath,
      omit(query, CHECKOUT_INVENTORY, REDIRECT_PATH)
    )
  );
};

const redirectToFeed = () => (dispatch, getState) => {
  const query = get(getState(), 'router.location.query');

  dispatch(
    router.push(
      HOME,
      omit(query, CHECKOUT_INVENTORY, REDIRECT_PATH)
    )
  );
};

const onZipChange = zip => (dispatch, getState) => {
  const oldState = getState();
  const oldConfig = oldState.peapod.config;

  return dispatch(peapod.changeZip(zip)).tap(() => {
    const state = getState();
    const { config } = state.peapod;
    const { region, name } = state.onlineCheckout.inventory;
    const { query } = state.router.location;

    if (oldConfig.priceZone !== config.priceZone) {
      dispatch(router.replace(ONLINE_CHECKOUT, assign({}, query, {
        shop: `${region}:${name}:${config.priceZone}`,
      })));
    }
  });
};

const actions = {
  onClose: close,
  onLogoClick: redirectToFeed,
  onSend: onlineCheckout.startSendingItems,
  onInventorySelect: onlineCheckout.selectInventory,
  onZipChange,
};

const selectHeader = ({ entries }) =>
  entries.length === 1
    ? OnlineCheckoutHeaderPeapod
    : OnlineCheckoutHeader;

const Header = props => {
  const Comp = selectHeader(props);
  return <Comp {...props} />;
};

export default connect(selector, actions)(Header);
