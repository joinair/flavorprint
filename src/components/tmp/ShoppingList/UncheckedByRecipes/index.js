
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsAggregatedByRecipeSelector
  from 'reducers/shoppingList/selectors/itemsAggregatedByRecipe';

import UncheckedByRecipes from './UncheckedByRecipes';

const recipesSelector = state => state.shoppingList.recipes;

const uncheckedByRecipesSelector = createStructuredSelector({
  groups: state => itemsAggregatedByRecipeSelector(state.shoppingList),
  recipes: recipesSelector,
});

export default connect(uncheckedByRecipesSelector)(UncheckedByRecipes);
