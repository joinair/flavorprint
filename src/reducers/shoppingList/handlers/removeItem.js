
import union from 'lodash/union';

import updateItem from 'reducers/shoppingList/helpers/updateItem';

export default (state, action) =>
  updateItem(
    state,
    action,
    (_uuid, { checked, unchecked, deleted }) => ({
      checked: [],
      unchecked: [],
      deleted: union(checked, unchecked, deleted),
    })
  );
