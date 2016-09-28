
import assign from 'lodash/assign';
import omit from 'lodash/omit';

import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

import { FP_SESSION, FP_SESSION_SIG } from 'constants/CookiesKeys';

import router from './router';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DESTROY_USER_REQUEST = 'DESTROY_USER_REQUEST';
export const DESTROY_USER_SUCCESS = 'DESTROY_USER_SUCCESS';
export const DESTROY_USER_FAILURE = 'DESTROY_USER_FAILURE';

export const BECOME_USER_REQUEST = 'BECOME_USER_REQUEST';
export const BECOME_USER_SUCCESS = 'BECOME_USER_SUCCESS';
export const BECOME_USER_FAILURE = 'BECOME_USER_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export const UPLOAD_USER_AVATAR_REQUEST = 'UPLOAD_USER_AVATAR_REQUEST';
export const UPLOAD_USER_AVATAR_SUCCESS = 'UPLOAD_USER_AVATAR_SUCCESS';
export const UPLOAD_USER_AVATAR_FAILURE = 'UPLOAD_USER_AVATAR_FAILURE';

export const update = (data = {}) => {
  const query = assign(
    {},
    data,
    data.recipes ? { recipes: { _set: data.recipes } } : {}
  );

  return {
    meta: {
      authenticationRequired: true,
    },

    payload: data,

    [API_CALL]: {
      endpoint: '/auth/profile',
      method: 'PATCH',
      query,
      types: [
        UPDATE_USER_REQUEST,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_FAILURE,
      ],
    },
  };
};

export const UPDATE_USER_LOCALLY = 'UPDATE_USER_LOCALLY';

export const updateLocally = (data = {}) => ({
  type: UPDATE_USER_LOCALLY,
  payload: data,
});

export const become = (sessionKey, sessionSig) => ({
  [API_CALL]: {
    endpoint: '/auth/become',
    method: 'POST',
    cookies: {
      [FP_SESSION]: sessionKey,
      [FP_SESSION_SIG]: sessionSig,
    },
    types: [
      BECOME_USER_REQUEST,
      BECOME_USER_SUCCESS,
      BECOME_USER_FAILURE,
    ],
  },
});

export const logOut = () => (dispatch, getState) => {
  const action = { type: LOG_OUT };

  if (global.Platform.OS === 'browser') {
    const { pathname, state, query } = getState().router.location;
    return dispatch({
      [CHAIN]: [
        action,
        router.push(pathname, query, omit(state, 'modal', 'forceReload')),
      ],
    });
  }

  return dispatch(action);
};

export const destroy = (reason, comment) => dispatch => {
  const action = {
    meta: {
      authenticationRequired: true,
      reason,
      comment,
    },

    [API_CALL]: {
      endpoint: '/auth/profile',
      method: 'DELETE',
      types: [
        DESTROY_USER_REQUEST,
        DESTROY_USER_SUCCESS,
        DESTROY_USER_FAILURE,
      ],
    },
  };

  return dispatch({ [CHAIN]: [action, logOut] });
};

export default {
  become,
  update,
  destroy,
  logOut,

  updateLocally,
};
