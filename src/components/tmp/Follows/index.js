
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import get from 'lodash/get';
import initial from 'lodash/initial';
import partial from 'lodash/partial';

import follows from 'actions/follows';

import './styles.css';
import Follows from './Follows';

const categorySelector = state => state.cookbook.follows.type;
const entriesSelector = state => state.cookbook.follows.entries;

const haveMoreSelector = state =>
  state.cookbook.follows.entries.length < state.cookbook.follows.paging.total;

const isFetchingSelector = state => state.cookbook.follows.isFetching;

const profileSelector = state =>
  get(state, 'router.params.username') === get(state, 'user.profile.username')
    ? state.user.profile
    : state.cookbook.user.profile;

const numFollowersSelector = createSelector(
  profileSelector, ({ numFollowers }) => numFollowers | 0
);

const numFollowingSelector = createSelector(
  profileSelector, ({ numFollowing }) => numFollowing | 0
);

const pathnameBaseSelector = state =>
  initial(state.router.location.pathname.split('/')).join('/');

const followsSelector = createStructuredSelector({
  category: categorySelector,
  follows: entriesSelector,
  haveMore: haveMoreSelector,
  isFetching: isFetchingSelector,
  numFollowers: numFollowersSelector,
  numFollowing: numFollowingSelector,
  pathnameBase: pathnameBaseSelector,
});

const actions = {
  onLoadMore: partial(follows.loadUserFollows, true, null),
};

export default connect(followsSelector, actions)(Follows);
