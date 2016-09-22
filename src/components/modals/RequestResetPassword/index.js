
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { domain } from 'constants/Config';
import { RESET_PASSWORD } from 'constants/Routes';

import notifications from 'actions/notifications';
import user from 'actions/user';

import RequestResetPassword from './RequestResetPassword';

const requestResetPasswordSelector = createStructuredSelector({
  email: state => state.user.profile.email,
});

const makeRequest = email => {
  const redirectUri = `${domain}${RESET_PASSWORD}`;
  return user.requestResetPassword(email, redirectUri);
};

const actions = {
  onRequest: makeRequest,
  showNotification: notifications.show,
};

export default connect(requestResetPasswordSelector, actions)(RequestResetPassword);
