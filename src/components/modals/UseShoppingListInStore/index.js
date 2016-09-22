
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';

import { RECIPE } from 'constants/ShoppingListFilters';

import notifications from 'actions/notifications';
import shoppingList from 'actions/shoppingList';

import UseShoppingListInStore from './UseShoppingListInStore';

const itemsSelector = state => state.shoppingList.items;

const hasItemsSelector = createSelector(
  itemsSelector,
  items =>
    some(items, ({ checked, unchecked }) => !isEmpty(checked) || !isEmpty(unchecked))
);

const useShoppingListInStoreSelector = createStructuredSelector({
  email: state => state.user.profile.email,
  hasItems: hasItemsSelector,
  isTizenFridge: state => state.tizen.isFridge,
});

const sendShoppingList = email => (dispatch, getState) => {
  const sortBy = getState().shoppingList.sortBy;
  const ordering = sortBy === RECIPE ? 'Recipe' : 'Category';

  return dispatch(shoppingList.send(email, ordering));
};

const actions = {
  onSend: sendShoppingList,
  showNotification: notifications.show,
};

export default connect(useShoppingListInStoreSelector, actions)(UseShoppingListInStore);
