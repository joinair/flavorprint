
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsAggregatedByCategorySelector
  from 'reducers/shoppingList/selectors/itemsAggregatedByCategory';

import GroupByCategories from './GroupByCategories';

const recipesSelector = state => state.shoppingList.recipes;
const fontSizeSelector = state => state.printList.isLarge;
const showRecipeKeySelector = state => state.printList.isKeyVisible;

const groupByCategoriesSelector = createStructuredSelector({
  categories: state => itemsAggregatedByCategorySelector(state.shoppingList),
  recipes: recipesSelector,
  fontSize: fontSizeSelector, // Used to refresh masonry
  showRecipeKey: showRecipeKeySelector,
});

export default connect(groupByCategoriesSelector)(GroupByCategories);
