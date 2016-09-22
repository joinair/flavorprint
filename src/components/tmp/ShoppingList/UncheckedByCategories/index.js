
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsAggregatedByCategorySelector
  from 'reducers/shoppingList/selectors/itemsAggregatedByCategory';

import UncheckedByCategories from './UncheckedByCategories';

const recipesSelector = state => state.shoppingList.recipes;

const uncheckedByCategoriesSelector = createStructuredSelector({
  categories: state => itemsAggregatedByCategorySelector(state.shoppingList),
  recipes: recipesSelector,
});

export default connect(uncheckedByCategoriesSelector)(UncheckedByCategories);
