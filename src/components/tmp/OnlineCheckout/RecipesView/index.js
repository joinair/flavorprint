
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import itemsAggregatedByRecipeSelector
  from 'reducers/onlineCheckout/selectors/itemsAggregatedByRecipe';

import RecipesView from './RecipesView';

const onlineCheckoutSelector = state => state.onlineCheckout;
const recipesSelector = state => state.shoppingList.recipes;
const shoppingListSelector = state => state.shoppingList;

const groupsSelector = itemsAggregatedByRecipeSelector(
  onlineCheckoutSelector,
  shoppingListSelector
);

const recipesViewSelector = createStructuredSelector({
  groups: groupsSelector,
  recipes: recipesSelector,
});

export default connect(recipesViewSelector)(RecipesView);
