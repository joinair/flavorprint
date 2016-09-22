
import assign from 'lodash/assign';
import reduce from 'lodash/reduce';

import applyOperation from 'reducers/shoppingList/helpers/applyOperation';

export default (state, action) => {
  const { operations } = action.payload;

  return assign({}, state, {
    items: reduce(operations, applyOperation, assign({}, state.items)),
    operations: state.operations.concat(operations),
  });
};
