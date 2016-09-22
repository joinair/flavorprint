
import assign from 'lodash/assign';
import union from 'lodash/union';

import itemId from 'reducers/shoppingList/helpers/itemId';

export default (state, action) => {
  const { createdAt, extra, key, recipe, uuid } = action.payload;
  const id = itemId(key);
  const oldItem = state.items[id];

  const uuids = {
    checked: [],
    unchecked: [uuid],
    deleted: oldItem
      ? union(oldItem.checked, oldItem.unchecked, oldItem.deleted)
      : [],
  };

  const item = assign({ key, createdAt }, uuids, extra);
  const operation = assign({ key, createdAt }, uuids, extra);

  const items = assign({}, state.items, { [id]: item });
  const recipes = key.recipe
    ? assign({}, state.recipes, { [recipe.externalUrl || recipe.id]: recipe })
    : state.recipes;

  return assign({}, state, {
    items,
    recipes,
    operations: state.operations.concat(operation),
  });
};
