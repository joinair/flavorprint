
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ShoppingListSidebar from './ShoppingListSidebar';

import shoppingListSidebar from 'actions/shoppingListSidebar';

const isSidebarOpenedSelector = state => state.shoppingListSidebar.isOpen;

const sidebarSelector = createStructuredSelector({
  isSidebarOpened: isSidebarOpenedSelector,
});

const actions = { onSidebarClose: shoppingListSidebar.close };

export default connect(sidebarSelector, actions)(ShoppingListSidebar);
