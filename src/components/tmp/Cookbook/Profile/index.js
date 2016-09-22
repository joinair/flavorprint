
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';

import { SETTINGS } from 'constants/Routes';
import { REDIRECT_PATH } from 'constants/QueryParams';

import router from 'actions/router';

import Profile from './Profile';

const selector = createStructuredSelector({
  isTizenFridge: state => state.tizen.isFridge,
});

const redirectToSettings = () => (dispatch, getState) => {
  const state = getState();
  const { location } = state.router;
  const { pathname, query } = location;

  const newQuery = assign({}, query, { [REDIRECT_PATH]: pathname });

  dispatch(router.push(SETTINGS, newQuery));
};

const actions = {
  onProfileEdit: redirectToSettings,
};

export default connect(selector, actions)(Profile);
