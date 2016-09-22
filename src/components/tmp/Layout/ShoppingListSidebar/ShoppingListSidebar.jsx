
import React, { PropTypes } from 'react';

import Sidebar from 'components/ui-elements/Sidebar';

import './ShoppingListSidebar.css';

const sidebarMenuClass = 'ShoppingListSidebar';

const ShoppingListSidebar = ({ isSidebarOpened, onSidebarClose }) =>
  <Sidebar
    isOpen={isSidebarOpened}
    onSidebarClose={onSidebarClose}
    className={sidebarMenuClass}
    right
  />;

ShoppingListSidebar.propTypes = {
  isSidebarOpened: PropTypes.bool.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
};

export default ShoppingListSidebar;
