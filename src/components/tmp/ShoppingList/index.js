
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';

import { USE_SHOPPING_LIST_IN_STORE } from 'constants/Modals';
import { MOBILE_SHOPPING_LIST_ITEMS } from 'constants/Routes';

import modal from 'actions/modal';

import ShoppingList from './ShoppingList';

const itemsSelector = state => state.shoppingList.items;

const hasItemsSelector = createSelector(
  itemsSelector,
  items =>
    some(items, ({ checked, unchecked }) => !isEmpty(checked) || !isEmpty(unchecked))
);

const selector = createStructuredSelector({
  hasItems: hasItemsSelector,
  inventories: state => state.inventories.entries,
  view: state => state.shoppingList.sortBy,
  isTizenFridge: state => state.tizen.isFridge,
});

const actions = (dispatch, props) => bindActionCreators({
  onShoppingListUseInStore: () => modal.open(USE_SHOPPING_LIST_IN_STORE),
  onOpenAutocomplete: () => props.routerActions.push(MOBILE_SHOPPING_LIST_ITEMS),
}, dispatch);

export default connect(selector, actions)(ShoppingList);
