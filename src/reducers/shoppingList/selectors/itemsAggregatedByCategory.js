
import aggregateItemsByCategory from
  'reducers/shoppingList/helpers/aggregateItemsByCategory';

import uncheckedItemsSelector from './uncheckedItems';

export default aggregateItemsByCategory(uncheckedItemsSelector);
