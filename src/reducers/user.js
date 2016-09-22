
import assign from 'lodash/assign';
import get from 'lodash/get';
import includes from 'lodash/includes';

import { formatKey } from 'helpers/cookies';
import createReducer from 'helpers/createReducer';

import { JWT_HEADER } from 'constants/CookiesKeys';

import { RESTORE_FROM_COOKIES } from 'actions/cookies';

import {
  BECOME_USER_SUCCESS,
  UPDATE_USER_SUCCESS,

  UPDATE_USER_LOCALLY,

  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,

  ANONYMOUS_SIGN_UP_SUCCESS,
  ANONYMOUS_SIGN_UP_FAILURE,

  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,

  LOG_OUT,
} from 'actions/user';

import {
  OAUTH_LOG_IN_SUCCESS,
  OAUTH_LOG_IN_FAILURE,
} from 'actions/oauth';

import {
  LOAD_COOKBOOK_USER_SUCCESS,
} from 'actions/cookbook';

import {
  COMPLETE_STEP,
} from 'actions/onboarding';

const initialState = {
  isAuthenticated: false,
  error: {},

  uid: null,
  profile: {},
};

const authenticateUser = (state, action) => {
  const { provider } = action.payload;

  return assign(
    {},
    initialState,
    action.payload,
    { isAuthenticated: provider !== 'anonymous' }
  );
};

const handleError = (state, action) =>
  assign({}, state, { error: action.payload });

const updateUser = (state, action) =>
  assign(
    {},
    state,
    { profile: assign({}, state.profile, action.payload) }
  );

const handlers = {
  [RESTORE_FROM_COOKIES]: (state, action) =>
    assign({}, state, {
      JWTHeader: action.payload[formatKey(JWT_HEADER)],
    }),

  [UPDATE_USER_SUCCESS]: updateUser,
  [UPDATE_USER_LOCALLY]: updateUser,

  [SIGN_UP_SUCCESS]: authenticateUser,
  [LOG_IN_SUCCESS]: authenticateUser,
  [BECOME_USER_SUCCESS]: authenticateUser,
  [ANONYMOUS_SIGN_UP_SUCCESS]: authenticateUser,
  [OAUTH_LOG_IN_SUCCESS]: authenticateUser,

  [LOG_IN_FAILURE]: handleError,
  [SIGN_UP_FAILURE]: handleError,
  [ANONYMOUS_SIGN_UP_FAILURE]: handleError,
  [OAUTH_LOG_IN_FAILURE]: handleError,

  [LOG_OUT]: () => initialState,

  [LOAD_COOKBOOK_USER_SUCCESS]: (state, action) =>
    action.meta.currentUserRefresh
      ? assign(
          {},
          state,
          { profile: assign({}, state.profile, action.payload) }
        )
      : state,

  [COMPLETE_STEP]: (state, action) => {
    const { onboarding = [] } = state.profile;
    const { step } = action.payload;

    if (includes(onboarding, step)) {
      return state;
    }

    return assign(
      {},
      state,
      {
        profile: assign(
          {},
          state.profile,
          { onboarding: onboarding.concat(step) }
        ),
      }
    );
  },
};

const userReducer = createReducer(initialState, handlers);

export default (state, action) =>
  get(action, 'meta.JWTHeader')
    ? assign(
      {},
      userReducer(state, action),
      { JWTHeader: get(action, 'meta.JWTHeader') }
    )
    : userReducer(state, action);

// FIXME: FOLLOWS
// import updeep from 'updeep';
// import {
//   FOLLOW_USER_REQUEST,
//   FOLLOW_USER_FAILURE,

//   UNFOLLOW_USER_REQUEST,
//   UNFOLLOW_USER_FAILURE,
// } from 'actions/follows';

// const updateFollowing = follow => state =>
//   updeep({
//     profile: {
//       numFollowing: value => (value | 0) + (follow ? 1 : -1),
//     },
//   }, state);

// [FOLLOW_USER_REQUEST]: updateFollowing(true),
// [FOLLOW_USER_FAILURE]: updateFollowing(false),
// [UNFOLLOW_USER_REQUEST]: updateFollowing(false),
// [UNFOLLOW_USER_FAILURE]: updateFollowing(true),
