/* eslint no-param-reassign:0 */

import difference from 'lodash/difference';
import assign from 'lodash/assign';
import pick from 'lodash/pick';
import union from 'lodash/union';

import itemId from './itemId';

export default (items, operation) => {
  const { key, categoryAnalysisContainer } = operation;
  const id = itemId(key);
  const item = items[id];

  if (!item) {
    items[id] = pick(operation, [
      'key', 'categoryAnalysisContainer', 'groupOrder', 'createdAt',
      'checked', 'deleted', 'unchecked',
    ]);

    return items;
  }

  const deleted = union(operation.deleted, item.deleted);
  const checked = difference(union(operation.checked, item.checked), deleted);
  const unchecked = difference(union(operation.unchecked, item.unchecked), deleted);

  items[id] = assign({}, item,
    { deleted, checked, unchecked, categoryAnalysisContainer });

  return items;
};
