
import { connect } from 'react-redux';

import { followUser, unfollowUser } from 'actions/follows';

import FollowButton from './FollowButton';

const selector = (state, props) => ({
  isHidden:
    !state.user.isAuthenticated ||
    state.user.profile.username === props.username,
});

const actions = (dispatch, props) => ({
  onFollow: () => dispatch(followUser(props.username)),
  onUnfollow: () => dispatch(unfollowUser(props.username)),
});

export default connect(selector, actions)(FollowButton);
