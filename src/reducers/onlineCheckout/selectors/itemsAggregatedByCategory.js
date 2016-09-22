
import aggregateItemsByCategory from
  'reducers/shoppingList/helpers/aggregateItemsByCategory';

import itemsToBuySelector from './itemsToBuy';

export default (onlineCheckoutSelector, shoppingListSelector) =>
  aggregateItemsByCategory(
    itemsToBuySelector(onlineCheckoutSelector, shoppingListSelector)
  );
