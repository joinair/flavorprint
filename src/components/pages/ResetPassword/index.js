
import { connect } from 'react-redux';

import get from 'lodash/get';
import noop from 'lodash/noop';

import { HOME } from 'constants/Routes';

import notifications from 'actions/notifications';
import router from 'actions/router';
import user from 'actions/user';

import ResetPassword from './ResetPassword';

const makeReset = newPassword => (dispatch, getState) => {
  const token = get(getState(), 'router.location.query.token');

  const request$ = dispatch(user.resetPassword(newPassword, token));

  const onSuccess = () => {
    dispatch(router.replace(HOME));
  };

  request$.subscribe(onSuccess, noop);

  return request$;
};

const actions = {
  onPasswordReset: makeReset,
  showNotification: notifications.show,
};

export default connect(null, actions)(ResetPassword);
