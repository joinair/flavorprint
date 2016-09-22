
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import find from 'lodash/find';

import { inventoryToId } from 'helpers/inventories';

import { CHECKOUT_PROCESS } from 'constants/Modals';

import modal from 'actions/modal';
import onlineCheckout from 'actions/onlineCheckout';

import SendItemsToInventory from './SendItemsToInventory';

const entrySelector = state =>
  find(state.inventories.entries, entry =>
    entry.inventory.name === state.onlineCheckout.inventory.name
  );

const hasCredentialsSelector = state =>
  state.onlineCheckout.hasCredentials;

const selector = createStructuredSelector({
  entry: entrySelector,
  hasCredentials: hasCredentialsSelector,
});

const submitCredentials = credentials => (dispatch, getState) => {
  const inventory = getState().onlineCheckout.inventory;
  const id = inventoryToId(inventory);

  return dispatch(
    onlineCheckout.submitCredentials(id, credentials)
  );
};

const sendItems = () =>
  modal.openWithReplacement(CHECKOUT_PROCESS, null, {
    dimmer: { hidden: true },
  });

const actions = {
  onSend: sendItems,
  onCredentialsSubmit: submitCredentials,
};

export default connect(selector, actions)(SendItemsToInventory);
