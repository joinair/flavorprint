
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Summary from './Summary';

import itemsToBySelector from 'reducers/onlineCheckout/selectors/itemsToBy';

const onlineCheckoutSelector = state => state.onlineCheckout;
const shoppingListSelector = state => state.shoppingList;
const storeSelector = state => state.onlineCheckout.inventory.name;

const itemsSelector =
  itemsToBySelector(onlineCheckoutSelector, shoppingListSelector);

const summarySelector = createStructuredSelector({
  items: itemsSelector,
  store: storeSelector,
});

export default connect(summarySelector)(Summary);
