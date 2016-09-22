
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import onlineCheckout from 'actions/onlineCheckout';

import itemsWithDecision from 'reducers/onlineCheckout/selectors/itemsWithDecision';

import Summary from './Summary';

const storeSelector = state => state.onlineCheckout.inventory.name;
const shoppingListSelector = state => state.shoppingList;
const onlineCheckoutSelector = state => state.onlineCheckout;

const itemsSelector =
  itemsWithDecision(onlineCheckoutSelector, shoppingListSelector);

const selector = createStructuredSelector({
  items: itemsSelector,
  store: storeSelector,
});

const actions = {
  onSend: onlineCheckout.startSendingItems,
};

export default connect(selector, actions)(Summary);
