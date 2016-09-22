
import {
  LOAD_COOKBOOK_USER_REQUEST,
  LOAD_COOKBOOK_USER_SUCCESS,
} from 'actions/cookbook';

import createReducer from 'helpers/createReducer';

const initialState = {
  profile: {},
};

const handlers = {
  [LOAD_COOKBOOK_USER_REQUEST]: () => initialState,

  [LOAD_COOKBOOK_USER_SUCCESS]: (state, action) =>
    action.meta.currentUserRefresh
      ? state
      : { profile: action.payload },
};

export default createReducer(initialState, handlers);

// FIXME: FOLLOWS
// import updeep from 'updeep';
// import {
//   FOLLOW_USER_REQUEST,
//   FOLLOW_USER_FAILURE,

//   UNFOLLOW_USER_REQUEST,
//   UNFOLLOW_USER_FAILURE,
// } from 'actions/follows';

// const updateFollowers = follow => (state, action) => {
//   if (state.profile.username !== action.payload.username) { return state; }

//   return updeep({
//     profile: {
//       isFollowTarget: follow,
//       numFollowers: value => (value | 0) + (follow ? 1 : -1),
//     },
//   }, state);
// };

// [FOLLOW_USER_REQUEST]: updateFollowers(true),
// [FOLLOW_USER_FAILURE]: updateFollowers(false),

// [UNFOLLOW_USER_REQUEST]: updateFollowers(false),
// [UNFOLLOW_USER_FAILURE]: updateFollowers(true),
