
import aggregateItemsByRecipe from
  'reducers/shoppingList/helpers/aggregateItemsByRecipe';

import itemsToBuySelector from './itemsToBuy';

export default (onlineCheckoutSelector, shoppingListSelector) =>
  aggregateItemsByRecipe(
    itemsToBuySelector(onlineCheckoutSelector, shoppingListSelector)
  );
