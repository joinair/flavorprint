
import assign from 'lodash/assign';
import omit from 'lodash/omit';
import union from 'lodash/union';

import itemId from 'reducers/shoppingList/helpers/itemId';

export default (state, action) => {
  const { createdAt, key, text, uuid } = action.payload;
  const newKey = assign({}, key, { text });

  const id = itemId(key);
  const newId = itemId(newKey);

  const item = state.items[id];
  const oldItem = state.items[newId];

  if (!item) { return state; }

  const operations = [];
  const items = {};

  const removeUuids = {
    checked: [],
    unchecked: [],
    deleted: union(item.checked, item.unchecked, item.deleted),
  };

  items[id] = assign({}, item, removeUuids);
  operations.push(assign({}, item, { createdAt }, removeUuids));

  if (oldItem) {
    const uuids = {
      checked: [],
      unchecked: [uuid],
      deleted: union(oldItem.checked, oldItem.unchecked, oldItem.deleted),
    };

    items[newId] = assign({}, oldItem, { createdAt }, uuids);
    operations.push(assign({}, oldItem, { createdAt }, uuids));
  } else {
    const addUuids = assign({}, removeUuids, { unchecked: [uuid] });
    const newItem = assign(
      {},
      omit(item, 'categoryAnalysisContainer'),
      addUuids,
      {
        key: assign({}, item.key, { text }),
      }
    );

    items[newId] = assign({}, newItem, { createdAt }, addUuids);
    operations.push(assign({}, newItem, { createdAt }, addUuids));
  }

  return assign({}, state, {
    operations: state.operations.concat(operations),
    items: assign({}, state.items, items),
  });
};
