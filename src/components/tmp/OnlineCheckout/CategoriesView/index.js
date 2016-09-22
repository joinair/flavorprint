
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsAggregatedByCategorySelector
  from 'reducers/onlineCheckout/selectors/itemsAggregatedByCategory';

import CategoriesView from './CategoriesView';

const onlineCheckoutSelector = state => state.onlineCheckout;
const recipesSelector = state => state.shoppingList.recipes;
const shoppingListSelector = state => state.shoppingList;

const categoriesSelector = itemsAggregatedByCategorySelector(
  onlineCheckoutSelector,
  shoppingListSelector
);

const categoriesViewSelector = createStructuredSelector({
  categories: categoriesSelector,
  recipes: recipesSelector,
});

export default connect(categoriesViewSelector)(CategoriesView);
