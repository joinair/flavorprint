
import assign from 'lodash/assign';
import itemId from './itemId';

export default (state, action, uuidsModifer) => {
  const { createdAt, key, uuid } = action.payload;
  const id = itemId(key);
  const item = state.items[id];

  if (!item) { return state; }

  const { checked, unchecked, deleted } = item;
  const uuids = uuidsModifer(uuid, { checked, unchecked, deleted });

  const operations =
    state.operations.concat(assign({ createdAt }, item, uuids));

  const items = assign({}, state.items, {
    [id]: assign({}, item, uuids),
  });

  return assign({}, state, { items, operations });
};
