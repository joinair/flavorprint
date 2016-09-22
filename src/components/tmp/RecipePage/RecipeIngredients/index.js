
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import partial from 'lodash/partial';

import { addItem, addRecipe, removeItem, removeRecipe } from 'actions/shoppingList';

import RecipeIngredients from './RecipeIngredients';

const shoppingListItemsSelector = state => state.shoppingList.items;

const recipeIngredientsSelector = createStructuredSelector({
  shoppingListItems: shoppingListItemsSelector,
});

const actions = (dispatch, props) => bindActionCreators({
  onIngredientAddToShoppingList: addItem,
  onIngredientRemoveFromShoppingList: removeItem,
  onRecipeAddToShoppingList: partial(addRecipe, props.recipe),
  onRecipeRemoveFromShoppingList: partial(
    removeRecipe,
    props.recipe.externalUrl || props.recipe.id
  ),
}, dispatch);

export default connect(recipeIngredientsSelector, actions)(RecipeIngredients);
