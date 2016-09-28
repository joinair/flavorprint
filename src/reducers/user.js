
import assign from 'lodash/assign';
import includes from 'lodash/includes';

import createReducer from 'helpers/createReducer';

import {
  FP_SESSION,
  FP_SESSION_SIG,
} from 'constants/CookiesKeys';

import {
  BECOME_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_LOCALLY,

  LOG_OUT,
} from 'actions/user';

import {
  OAUTH_LOG_IN_SUCCESS,
  OAUTH_LOG_IN_FAILURE,
} from 'actions/oauth';

import {
  COMPLETE_STEP,
} from 'actions/onboarding';

import {
  RESTORE_FROM_COOKIES,
} from 'actions/cookies';

const initialState = {
  isAuthenticated: false,
  error: {},

  uid: null,
  profile: {},
};

const authenticateUser = (state, action) => {
  const { provider } = action.payload;
  const { sessionKey, sessionSig } = action.meta;

  return assign(
    { sessionKey, sessionSig },
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
  [RESTORE_FROM_COOKIES]: (state, action) => assign({}, state, {
    sessionKey: action.payload[FP_SESSION],
    sessionSig: action.payload[FP_SESSION_SIG],
  }),

  [UPDATE_USER_SUCCESS]: updateUser,
  [UPDATE_USER_LOCALLY]: updateUser,

  [BECOME_USER_SUCCESS]: authenticateUser,
  [OAUTH_LOG_IN_SUCCESS]: authenticateUser,

  [OAUTH_LOG_IN_FAILURE]: handleError,
  [LOG_OUT]: () => initialState,

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

export default createReducer(initialState, handlers);
