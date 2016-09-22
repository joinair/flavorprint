
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import modalActions from 'actions/modal';

import { AUTHENTICATION } from 'constants/Modals';

import AuthForOnboarding from './AuthForOnboarding';

const selector = createStructuredSelector({
  isVisible: (state, props) => {
    const isAuthenticated = state.user.isAuthenticated;
    const isAuthenticationModal = state.modal.type === AUTHENTICATION;

    return typeof props.sticky === 'boolean'
      ? props.sticky && (!isAuthenticated && !isAuthenticationModal)
      : !isAuthenticated && !isAuthenticationModal;
  },
});

const actions = {
  onLogInButtonClick: () =>
    modalActions.open(AUTHENTICATION, { selectedTab: 'Log in' }),

  onSignUpButtonClick: () =>
    modalActions.open(AUTHENTICATION, { selectedTab: 'Sign up' }),
};

export default connect(selector, actions)(AuthForOnboarding);
