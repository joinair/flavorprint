
import { connect } from 'react-redux';

import { REQUEST_RESET_PASSWORD } from 'constants/Modals';

import { updatePassword } from 'actions/user';
import { show } from 'actions/notifications';
import modal from 'actions/modal';

import SettingsPassword from './SettingsPassword';

const actions = {
  onForgotPassword: () => modal.open(REQUEST_RESET_PASSWORD),
  onPasswordUpdate: updatePassword,
  showNotification: show,
};

export default connect(null, actions)(SettingsPassword);
