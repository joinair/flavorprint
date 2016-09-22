
import union from 'lodash/union';

import updateItem from 'reducers/shoppingList/helpers/updateItem';

export default (state, action) =>
  updateItem(
    state,
    action,
    (uuid, { checked, unchecked, deleted }) => ({
      checked: [],
      unchecked: [uuid],
      deleted: union(checked, unchecked, deleted),
    })
  );
