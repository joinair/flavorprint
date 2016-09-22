
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Layout from './Layout';

const isNotFoundSelector = state => state.notFound;
const isSidebarMenuOpenedSelector = state => state.sidebarMenu.isOpen;

const selector = createStructuredSelector({
  isNotFound: isNotFoundSelector,
  isSidebarMenuOpened: isSidebarMenuOpenedSelector,
});

export default connect(selector)(Layout);
