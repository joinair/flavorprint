
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import head from 'lodash/head';

import { hide } from 'actions/notifications';

import Notification from './Notification';

const notificationSelector = createStructuredSelector({
  notification: state => head(state.notifications),
});

const actions = {
  onDismiss: hide,
};

export default connect(notificationSelector, actions)(Notification);
