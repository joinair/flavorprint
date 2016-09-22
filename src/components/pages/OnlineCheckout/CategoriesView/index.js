
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsAggregatedByCategorySelector
  from 'reducers/onlineCheckout/selectors/itemsAggregatedByCategory';

import CategoriesView from './CategoriesView';

const recipesSelector = state => state.shoppingList.recipes;
const shoppingListSelector = state => state.shoppingList;
const onlineCheckoutSelector = state => state.onlineCheckout;

const groupsSelector = itemsAggregatedByCategorySelector(
  onlineCheckoutSelector,
  shoppingListSelector
);

const selector = createStructuredSelector({
  groups: groupsSelector,
  recipes: recipesSelector,
});

export default connect(selector)(CategoriesView);
