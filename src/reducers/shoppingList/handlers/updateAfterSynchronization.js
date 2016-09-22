/* eslint no-param-reassign:0 */

import assign from 'lodash/assign';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import omit from 'lodash/omit';
import size from 'lodash/size';
import reduce from 'lodash/reduce';
import uniq from 'lodash/uniq';

import applyOperation from 'reducers/shoppingList/helpers/applyOperation';

const parseRecipe = (result, recipe) => {
  result[recipe.externalUrl || recipe.id] = recipe;
  return result;
};

const filterItems = (items, replaceShoppingList) => {
  if (replaceShoppingList) { return items; }

  const itemsToDelete = [];

  forEach(items, (item, id) => {
    const { checked, unchecked } = item;

    if (isEmpty(checked) && isEmpty(unchecked)) {
      itemsToDelete.push(id);
    }
  });

  return omit(items, itemsToDelete);
};

const filterRecipes = (items, recipes, replaceShoppingList) => {
  if (replaceShoppingList) { return recipes; }

  const usedRecipes = uniq(map(items, 'key.recipe'));
  const recipesToDelete = [];

  forEach(recipes, (_recipe, id) => {
    if (!includes(usedRecipes, id)) {
      recipesToDelete.push(id);
    }
  });

  return omit(recipes, recipesToDelete);
};

export default (state, action) => {
  const {
    operationSyncId, operations, recipes,
    replaceShoppingList,
  } = action.payload;

  let items;
  if (replaceShoppingList) {
    items = reduce(operations, applyOperation, {});
  } else if (isEmpty(operations)) {
    items = state.items;
  } else {
    items = reduce(operations, applyOperation, assign({}, state.items));
  }

  const filteredItems = filterItems(items, replaceShoppingList);

  let newRecipes;
  if (replaceShoppingList) {
    newRecipes = reduce(recipes, parseRecipe, {});
  } else if (isEmpty(recipes)) {
    newRecipes = state.recipes;
  } else {
    newRecipes = reduce(recipes, parseRecipe, assign({}, state.recipes));
  }

  const filteredRecipes =
    filterRecipes(filteredItems, newRecipes, replaceShoppingList);

  return assign({}, state, {
    operationSyncId: operationSyncId || state.operationSyncId,

    items: size(filteredItems) === size(items) ? items : filteredItems,
    operations: [],
    recipes: size(filteredRecipes) === size(newRecipes)
      ? newRecipes
      : filteredRecipes,
  });
};
