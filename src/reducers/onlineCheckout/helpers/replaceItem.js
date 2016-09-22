
import assign from 'lodash/assign';
import map from 'lodash/map';

export default (state, action, replacement) => {
  const items = map(state.items, item =>
    item.id === action.payload.itemId
      ? replacement(item)
      : item
  );

  return assign({}, state, { items });
};
