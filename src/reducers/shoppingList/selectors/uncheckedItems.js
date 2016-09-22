
import { createSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

export default createSelector(
  state => state.items,

  items => filter(items, ({ checked, unchecked }) =>
    isEmpty(checked) && !isEmpty(unchecked))
);
