
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Layout from './Layout';

const isNotFoundSelector = state => state.notFound;
const isSidebarMenuOpenedSelector = state => state.sidebarMenu.isOpen;
const isShoppingListOpenedSelector = state => state.shoppingListSidebar.isOpen;

const selector = createStructuredSelector({
  isNotFound: isNotFoundSelector,
  isSidebarMenuOpened: isSidebarMenuOpenedSelector,
  isShoppingListOpened: isShoppingListOpenedSelector,
});

export default connect(selector)(Layout);
