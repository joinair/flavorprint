/* eslint no-param-reassign:0 */

import assign from 'lodash/assign';
import reduce from 'lodash/reduce';
import union from 'lodash/union';

import itemId from 'reducers/shoppingList/helpers/itemId';

export default (state, action) => {
  const { createdAt, recipe, uuid } = action.payload;
  const { id, externalUrl, data } = recipe;
  const { ingredients } = data;
  const recipeId = externalUrl || id;

  const operations = [];
  const items = reduce(
    ingredients,
    (result, ingredient, groupOrder) => {
      const { text } = ingredient;
      const ingredientKey = { text, recipe: recipeId };
      const ingredientId = itemId(ingredientKey);

      const oldItem = state.items[ingredientId];

      const uuids = {
        checked: [],
        unchecked: [uuid],
        deleted: oldItem
          ? union(oldItem.checked, oldItem.unchecked, oldItem.deleted)
          : [],
      };

      result[ingredientId] = assign(
        { createdAt, groupOrder, key: ingredientKey },
        uuids
      );

      operations.push(assign(
        { createdAt, groupOrder, key: ingredientKey },
        uuids
      ));

      return result;
    },
    {}
  );

  return assign({}, state, {
    operations: state.operations.concat(operations),
    items: assign({}, state.items, items),
    recipes: assign({}, state.recipes, {
      [externalUrl || id]: recipe,
    }),
  });
};
