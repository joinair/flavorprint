
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsToBuySelector from
  'reducers/onlineCheckout/selectors/itemsToBuy';

import OnlineCheckout from './OnlineCheckout';

const viewSelector = state => state.shoppingList.sortBy;
const isFetchingSelector = state => state.onlineCheckout.isFetching;
const shoppingListSelector = state => state.shoppingList;
const onlineCheckoutSelector = state => state.onlineCheckout;

const itemsSelector = itemsToBuySelector(
  onlineCheckoutSelector,
  shoppingListSelector
);

const selector = createStructuredSelector({
  view: viewSelector,
  items: itemsSelector,
  isFetching: isFetchingSelector,
});

export default connect(selector)(OnlineCheckout);
