
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { AUTHENTICATION, SEARCH } from 'constants/Modals';

import modal from 'actions/modal';
import sidebarMenu from 'actions/sidebarMenu';

import { logOut } from 'actions/user';

import AppHeader from './AppHeader';

const isAuthenticatedSelector = state => state.user.isAuthenticated;
const profileSelector = state => state.user.profile;
const routerPathSelector = state => get(state.router, 'location.pathname');

const appHeaderSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  profile: profileSelector,
  routerPath: routerPathSelector,
});

const actions = {
  onLogOut: logOut,
  onLogInButtonClick: () => modal.open(AUTHENTICATION, { selectedTab: 'Log in' }),
  onSearch: () => modal.open(SEARCH),
  onSidebarOpen: sidebarMenu.open,
  onSignUpButtonClick: () => modal.open(AUTHENTICATION, { selectedTab: 'Sign up' }),
};

export default connect(appHeaderSelector, actions)(AppHeader);
