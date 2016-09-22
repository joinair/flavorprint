
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';

import { AUTHENTICATION } from 'constants/Modals';

import sidebarMenu from 'actions/sidebarMenu';
import modal from 'actions/modal';
import { logOut } from 'actions/user';

import SidebarMenu from './SidebarMenu';

const isAuthenticatedSelector = state => state.user.isAuthenticated;
const isSidebarOpenedSelector = state => state.sidebarMenu.isOpen;
const profileSelector = state => state.user.profile;

const userSelector = createSelector(
  isAuthenticatedSelector,
  profileSelector,

  (isAuthenticated, profile) => assign({ isAuthenticated }, profile)
);

const sidebarMenuSelector = createStructuredSelector({
  user: userSelector,
  isSidebarOpened: isSidebarOpenedSelector,
});

const actions = {
  onLogInButtonClick: () => modal.open(AUTHENTICATION, { selectedTab: 'Log in' }),
  onLogOut: logOut,
  onSidebarClose: sidebarMenu.close,
  onSignUpButtonClick: () => modal.open(AUTHENTICATION, { selectedTab: 'Sign up' }),
};

export default connect(sidebarMenuSelector, actions)(SidebarMenu);
