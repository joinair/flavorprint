/* eslint no-param-reassign:0 */

import assign from 'lodash/assign';
import reduce from 'lodash/reduce';
import union from 'lodash/union';

export default (state, action) => {
  const { createdAt } = action.payload;

  const operations = [];
  const items = reduce(
    state.items,
    (result, item, key) => {
      const { checked, unchecked, deleted } = item;

      const uuids = ({
        checked: [],
        unchecked: [],
        deleted: union(checked, unchecked, deleted),
      });

      operations.push(assign({ createdAt }, item, uuids));
      result[key] = assign({}, item, uuids);

      return result;
    },
    {}
  );

  return assign({}, state, {
    items,
    operations: state.operations.concat(operations),
  });
};
