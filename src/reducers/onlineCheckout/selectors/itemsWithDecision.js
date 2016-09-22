
import { createSelector } from 'reselect';

import filter from 'lodash/filter';

import itemsToBuySelector from './itemsToBuy';

export default (onlineCheckoutSelector, shoppingListSelector) =>
  createSelector(
    itemsToBuySelector(onlineCheckoutSelector, shoppingListSelector),
    items => filter(items, 'siDecision')
  );
