
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';

import shoppingList from 'actions/shoppingList';

import ItemsList from './ItemsList';

const itemsSelector = state => state.shoppingList.items;
const recipesSelector = state => state.shoppingList.recipes;

const checkedItemsSelector = createSelector(itemsSelector, items =>
  reject(items, item => isEmpty(item.checked))
);

const gotItSelector = createStructuredSelector({
  items: checkedItemsSelector,
  recipes: recipesSelector,
});

const actions = {
  onCheckedClear: shoppingList.clearCheckedItems,
  onItemRemove: shoppingList.removeItem,
  onItemUncheck: shoppingList.uncheckItem,
};

export default connect(gotItSelector, actions)(ItemsList);
