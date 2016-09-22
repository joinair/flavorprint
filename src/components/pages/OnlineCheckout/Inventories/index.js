
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsWithDecision from 'reducers/onlineCheckout/selectors/itemsWithDecision';

import onlineCheckout from 'actions/onlineCheckout';

import OnlineCheckoutInventories from './Inventories';

const entriesSelector = state => state.inventories.entries;
const inventorySelector = state => state.onlineCheckout.inventory;
const shoppingListSelector = state => state.shoppingList;
const onlineCheckoutSelector = state => state.onlineCheckout;
const isFetchingSelector = state => state.onlineCheckout.isFetching;

const itemsSelector = itemsWithDecision(
  onlineCheckoutSelector,
  shoppingListSelector
);

const selector = createStructuredSelector({
  items: itemsSelector,
  entries: entriesSelector,
  inventory: inventorySelector,
  isFetching: isFetchingSelector,
});

const actions = {
  onInventorySelect: onlineCheckout.selectInventory,
};

export default connect(selector, actions)(OnlineCheckoutInventories);
