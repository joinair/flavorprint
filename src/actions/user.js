
import assign from 'lodash/assign';
import omit from 'lodash/omit';

import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

import config from 'constants/Config';

import images from './images';
import router from './router';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const REQUEST_RESET_PASSWORD_REQUEST = 'REQUEST_RESET_PASSWORD_REQUEST';
export const REQUEST_RESET_PASSWORD_SUCCESS = 'REQUEST_RESET_PASSWORD_SUCCESS';
export const REQUEST_RESET_PASSWORD_FAILURE = 'REQUEST_RESET_PASSWORD_FAILURE';

export const DESTROY_USER_REQUEST = 'DESTROY_USER_REQUEST';
export const DESTROY_USER_SUCCESS = 'DESTROY_USER_SUCCESS';
export const DESTROY_USER_FAILURE = 'DESTROY_USER_FAILURE';

export const BECOME_USER_REQUEST = 'BECOME_USER_REQUEST';
export const BECOME_USER_SUCCESS = 'BECOME_USER_SUCCESS';
export const BECOME_USER_FAILURE = 'BECOME_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const ANONYMOUS_SIGN_UP_REQUEST = 'ANONYMOUS_SIGN_UP_REQUEST';
export const ANONYMOUS_SIGN_UP_SUCCESS = 'ANONYMOUS_SIGN_UP_SUCCESS';
export const ANONYMOUS_SIGN_UP_FAILURE = 'ANONYMOUS_SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export const UPLOAD_USER_AVATAR_REQUEST = 'UPLOAD_USER_AVATAR_REQUEST';
export const UPLOAD_USER_AVATAR_SUCCESS = 'UPLOAD_USER_AVATAR_SUCCESS';
export const UPLOAD_USER_AVATAR_FAILURE = 'UPLOAD_USER_AVATAR_FAILURE';

export const VALIDATE_USERNAME_REQUEST = 'VALIDATE_USERNAME_REQUEST';
export const VALIDATE_USERNAME_SUCCESS = 'VALIDATE_USERNAME_SUCCESS';
export const VALIDATE_USERNAME_FAILURE = 'VALIDATE_USERNAME_FAILURE';

export const VERIFY_TOKEN_REQUEST = 'VERIFY_TOKEN_REQUEST';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE';

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

export const updatePassword = (currentPassword, newPassword) => ({
  meta: { authenticationRequired: true },

  [API_CALL]: {
    endpoint: '/auth/updatePassword',
    method: 'POST',
    query: { currentPassword, newPassword },
    types: [
      UPDATE_PASSWORD_REQUEST,
      UPDATE_PASSWORD_SUCCESS,
      UPDATE_PASSWORD_FAILURE,
    ],
  },
});

export const resetPassword = (newPassword, token) => ({
  [API_CALL]: {
    endpoint: '/auth/resetPassword',
    method: 'POST',
    query: { newPassword, token },
    types: [
      RESET_PASSWORD_REQUEST,
      RESET_PASSWORD_SUCCESS,
      RESET_PASSWORD_FAILURE,
    ],
  },
});

export const become = JWTHeader => ({
  [API_CALL]: {
    endpoint: '/auth',
    headers: {
      Authorization: JWTHeader,
    },
    types: [
      BECOME_USER_REQUEST,
      BECOME_USER_SUCCESS,
      BECOME_USER_FAILURE,
    ],
  },
});

export const signUp = data => ({
  [API_CALL]: {
    endpoint: '/auth/create',
    method: 'POST',
    query: data,
    types: [
      SIGN_UP_REQUEST,
      SIGN_UP_SUCCESS,
      SIGN_UP_FAILURE,
    ],
  },
});

export const anonymousSignUp = () => ({
  [API_CALL]: {
    endpoint: '/auth/anonymous',
    method: 'POST',
    types: [
      ANONYMOUS_SIGN_UP_REQUEST,
      ANONYMOUS_SIGN_UP_SUCCESS,
      ANONYMOUS_SIGN_UP_FAILURE,
    ],
  },
});

export const logIn = data => ({
  [API_CALL]: {
    endpoint: '/auth/login',
    method: 'POST',
    query: data,
    types: [
      LOG_IN_REQUEST,
      LOG_IN_SUCCESS,
      LOG_IN_FAILURE,
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

export const uploadAvatar = image =>
  images.uploadImage(
    image,
    config.cloudinary.avatarsPreset,
    [
      UPLOAD_USER_AVATAR_REQUEST,
      UPLOAD_USER_AVATAR_SUCCESS,
      UPLOAD_USER_AVATAR_FAILURE,
    ]
  );

export const validateUsername = username => ({
  [API_CALL]: {
    endpoint: '/auth/checkUsername',
    method: 'POST',
    query: { username },
    types: [
      VALIDATE_USERNAME_REQUEST,
      VALIDATE_USERNAME_SUCCESS,
      VALIDATE_USERNAME_FAILURE,
    ],
  },
});

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

export const requestResetPassword = (email, redirectUri) => ({
  [API_CALL]: {
    endpoint: '/auth/requestResetPassword',
    method: 'POST',
    query: { email, redirectUri },
    types: [
      REQUEST_RESET_PASSWORD_REQUEST,
      REQUEST_RESET_PASSWORD_SUCCESS,
      REQUEST_RESET_PASSWORD_FAILURE,
    ],
  },
});

export const verifyToken = token => ({
  [API_CALL]: {
    endpoint: '/auth/verifyToken',
    query: { token },
    types: [
      VERIFY_TOKEN_REQUEST,
      VERIFY_TOKEN_SUCCESS,
      VERIFY_TOKEN_FAILURE,
    ],
  },
});

export default {
  update,
  destroy,
  logOut,

  updateLocally,

  resetPassword,
  requestResetPassword,
  verifyToken,
};
