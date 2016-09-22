
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';
import omit from 'lodash/omit';

import platformPick from 'helpers/platformPick';
import { getAllSteps } from 'helpers/onboarding';

import { DELETE_ACCOUNT } from 'constants/Modals';
import { REDIRECT_PATH } from 'constants/QueryParams';
import {
  MOBILE_AVOIDANCES_MODAL,
  MOBILE_WEB_VIEW,
  PREFERENCES,
  RESET_PASSWORD,
  SETTINGS,
  SETTINGS_MORE,
} from 'constants/Routes';

import {
  update,
  uploadAvatar,
  validateUsername,
  logOut,
} from 'actions/user';

import modal from 'actions/modal';
import { show } from 'actions/notifications';
import router from 'actions/router';

import Settings, {
  PREFERENCES_TAB,
  PROFILE_TAB,
  MORE_TAB,
} from './Settings';

const tabSelector = (state, props) => {
  const path = get(props, 'route.path', get(state.router, 'location.pathname'));

  switch (path) {
    case PREFERENCES: return PREFERENCES_TAB;
    case SETTINGS_MORE: return MORE_TAB;
    default: return PROFILE_TAB;
  }
};

const selector = createStructuredSelector({
  preferences: state => state.preferences.categories,
  profile: state => state.user.profile,
  provider: state => state.user.provider,
  tab: tabSelector,
  allSteps: getAllSteps,
  isTizenFridge: state => state.tizen.isFridge,
});

const onTabChange = platformPick({
  mobile: props => tab => {
    props.routerActions.replace({
      [PREFERENCES_TAB]: PREFERENCES,
      [PROFILE_TAB]: SETTINGS,
      [MORE_TAB]: SETTINGS_MORE,
    }[tab]);
  },

  default: () =>
    tab => router.push(tab === PREFERENCES_TAB ? PREFERENCES : SETTINGS),
});

const redirectToPrevPage = () => (dispatch, getState) => {
  const query = get(getState(), 'router.location.query');
  const redirectPath = get(query, REDIRECT_PATH);

  if (redirectPath) {
    dispatch(router.push(redirectPath, omit(query, REDIRECT_PATH)));
  }
};

const onBrowserOpen = props => url => props.routerActions && props.routerActions.push({
  path: MOBILE_WEB_VIEW,
  query: { url },
  toplevel: true,
});

const openAvoidancesModal = props => platformPick({
  mobile: () => {
    props.routerActions.push({
      path: MOBILE_AVOIDANCES_MODAL,
      toplevel: true,
    });
  },

  default: () => {},
});

const onPasswordReset = props => platformPick({
  mobile: () =>
    props.routerActions.push({ path: RESET_PASSWORD, toplevel: true }),

  default: () => {},
});

const actions = (dispatch, props) => bindActionCreators({
  onAvatarUpload: uploadAvatar,
  onDelete: () => modal.open(DELETE_ACCOUNT),
  onOpenAvoidancesModal: openAvoidancesModal(props),
  onLeave: redirectToPrevPage,
  onLogOut: logOut,
  onSave: update,
  onTabChange: onTabChange(props),
  onBrowserOpen: onBrowserOpen(props),
  onPasswordReset: onPasswordReset(props),
  showNotification: show,
  validateUsername,
}, dispatch);

export default connect(selector, actions)(Settings);
