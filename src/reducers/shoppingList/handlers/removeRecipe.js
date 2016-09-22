/* eslint no-param-reassign:0 */

import assign from 'lodash/assign';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import startsWith from 'lodash/startsWith';
import union from 'lodash/union';

export default (state, action) => {
  const { createdAt, id } = action.payload;
  const operations = [];
  const items = reduce(
    state.items,
    (result, item, key) => {
      if (!startsWith(key, id)) { return result; }

      const { checked, unchecked, deleted } = item;

      if (isEmpty(checked) && isEmpty(unchecked)) { return result; }

      const uuids = {
        checked: [],
        unchecked: [],
        deleted: union(checked, unchecked, deleted),
      };

      operations.push(assign({ createdAt }, item, uuids));
      result[key] = assign({}, item, uuids);

      return result;
    },
    {}
  );

  return assign({}, state, {
    operations: state.operations.concat(operations),
    items: assign({}, state.items, items),
  });
};
