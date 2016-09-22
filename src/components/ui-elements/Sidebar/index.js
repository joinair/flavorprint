
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Sidebar from './Sidebar';

const sidebarSelector = createStructuredSelector({
  isModalOpened: state => !!state.modal.type,
});

export default connect(sidebarSelector)(Sidebar);
