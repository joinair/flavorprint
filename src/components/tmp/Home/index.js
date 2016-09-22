
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import fetching from 'actions/fetching';

import Component from './Home';

const isAuthenticatedSelector = state =>
  state.user.isAuthenticated;

const isFetchingSelector = state =>
  state.fetching[fetching.GROUP_IDS.HOME_PAGE];

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  isFetching: isFetchingSelector,
});

export default connect(selector)(Component);
