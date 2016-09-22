
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PrintListKey from './PrintListKey';

const isPrintListKeyVisibleSelector = state => state.printList.isKeyVisible;

const recipesSelector = state => state.shoppingList.recipes;

const groupedSelector = createStructuredSelector({
  recipes: recipesSelector,
  isKeyVisible: isPrintListKeyVisibleSelector,
});

export default connect(groupedSelector)(PrintListKey);
