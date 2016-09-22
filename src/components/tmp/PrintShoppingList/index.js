
import { connect } from 'react-redux';

import PrintShoppingList from './PrintShoppingList';

const shoppingListSelector = state => ({
  isFontSizeLarge: state.printList.isLarge,
  view: state.shoppingList.sortBy,
  recipes: state.shoppingList.recipes,
});

export default connect(shoppingListSelector)(PrintShoppingList);
