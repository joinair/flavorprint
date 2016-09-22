
import aggregateItemsByRecipe from
  'reducers/shoppingList/helpers/aggregateItemsByRecipe';

import uncheckedItemsSelector from './uncheckedItems';

export default aggregateItemsByRecipe(uncheckedItemsSelector);
