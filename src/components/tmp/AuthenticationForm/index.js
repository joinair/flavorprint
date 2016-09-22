
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { REQUEST_RESET_PASSWORD } from 'constants/Modals';
import { RESET_PASSWORD } from 'constants/Routes';

import platformPick from 'helpers/platformPick';

import AuthenticationForm from './AuthenticationForm';

import {
  signUp,
  logIn,
} from 'actions/user';

import {
  facebookLogIn,
  googleLogIn,
} from 'actions/oauth';

import modal from 'actions/modal';

const selector = createStructuredSelector({
  user: state => state.user,
});

const actions = (dispatch, props) => bindActionCreators({
  onFacebookLogIn: facebookLogIn,
  onGoogleLogIn: googleLogIn,
  onSignUp: signUp,
  onForgotPassword: platformPick({
    mobile: () => props.routerActions.push({
      path: RESET_PASSWORD,
      toplevel: true,
    }),

    default: () => modal.open(REQUEST_RESET_PASSWORD),
  }),
  onLogIn: logIn,
}, dispatch);

export default connect(selector, actions)(AuthenticationForm);
