
import { createSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

import itemId from 'reducers/shoppingList/helpers/itemId';

export default (onlineCheckoutSelector, shoppingListSelector) =>
  createSelector(
    onlineCheckoutSelector,
    shoppingListSelector,

    (onlineCheckout, shoppingList) =>
      filter(onlineCheckout.items, item => {
        const id = itemId(item.key);
        const { checked, unchecked } = shoppingList.items[id] || {};

        return isEmpty(checked) && !isEmpty(unchecked);
      })
  );
