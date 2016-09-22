
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changeFilter } from 'actions/shoppingList';
import printList from 'actions/printList';

import PrintShoppingListActions from './PrintShoppingListActions';

const sortBySelector = state => state.shoppingList.sortBy;

const isPrintListExtraLinesVisibleSelector = state => state.printList.isExtraLinesVisible;
const isPrintListFontSizeLargeSelector = state => state.printList.isLarge;
const isPrintListKeyVisibleSelector = state => state.printList.isKeyVisible;

const printShoppingListActionsSelector = createStructuredSelector({
  sortBy: sortBySelector,
  isFontSizeLarge: isPrintListFontSizeLargeSelector,
  isExtraLinesVisible: isPrintListExtraLinesVisibleSelector,
  isKeyVisible: isPrintListKeyVisibleSelector,
});

const actions = {
  onFilterChange: changeFilter,
  onShowKey: printList.showKey,
  onHideKey: printList.hideKey,

  onFontSizeLarge: printList.fontSizeLarge,
  onFontSizeSmall: printList.fontSizeSmall,

  onShowExtraLines: printList.showExtraLines,
  onHideExtraLines: printList.hideExtraLines,
};

export default connect(printShoppingListActionsSelector, actions)(PrintShoppingListActions);
