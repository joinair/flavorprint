
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsAggregatedByRecipeSelector
  from 'reducers/shoppingList/selectors/itemsAggregatedByRecipe';

import GroupByRecipes from './GroupByRecipes';

const recipesSelector = state => state.shoppingList.recipes;
const fontSizeSelector = state => state.printList.isLarge;

const groupByRecipesSelector = createStructuredSelector({
  groups: state => itemsAggregatedByRecipeSelector(state.shoppingList),
  recipes: recipesSelector,
  fontSize: fontSizeSelector, // Used to refresh masonry
});

export default connect(groupByRecipesSelector)(GroupByRecipes);
