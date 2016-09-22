
import assign from 'lodash/assign';
import noop from 'lodash/noop';
import qs from 'qs';
import Rx from 'rx';

import facebook from 'helpers/facebook';
import google from 'helpers/google';

import { API_CALL } from 'middleware/API';
import { AUTH_DATA } from 'constants/CookiesKeys';
import { REDIRECT_PATH } from 'constants/QueryParams';

const services = { facebook, google };

export const OAUTH_LOG_IN_REQUEST = 'OAUTH_LOG_IN_REQUEST';
export const OAUTH_LOG_IN_SUCCESS = 'OAUTH_LOG_IN_SUCCESS';
export const OAUTH_LOG_IN_FAILURE = 'OAUTH_LOG_IN_FAILURE';

export const sendOAuth = (authData, service) => {
  const { oAuthRedirectURI } = services[service];
  return {
    [API_CALL]: {
      endpoint: `/auth/${service}`,
      method: 'POST',
      query: {
        code: authData.code,
        redirectUri: oAuthRedirectURI(),
      },
      types: [
        OAUTH_LOG_IN_REQUEST,
        OAUTH_LOG_IN_SUCCESS,
        OAUTH_LOG_IN_FAILURE,
      ],
    },
  };
};

const oAuthLogIn = service => (dispatch, getState) => {
  if (global.Platform.OS !== 'browser') return undefined;

  const { oAuthLink } = services[service];
  const popupWindowPosition = require('helpers/popupWindowPosition').default;
  const cookies = require('helpers/cookies').default;

  const { location } = getState().router;
  const { pathname, query } = location;

  const state = encodeURIComponent(
    qs.stringify(
      query[REDIRECT_PATH]
        ? query
        : assign({ [REDIRECT_PATH]: pathname }, query)
    )
  );

  const width = 700;
  const height = 500;
  const { left, top } = popupWindowPosition(width, height);

  const logInWindow = window.open(
    oAuthLink(undefined, state),
    `${service}LogIn`,
    'toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,' +
    `width=${width},height=${height},left=${left},top=${top}`
  );

  if (logInWindow && logInWindow.focus) {
    logInWindow.focus();
  }

  Rx.Observable.interval(100)
    .filter(() => logInWindow.closed)
    .take(1)
    .subscribe(noop, noop, () => {
      const authData = JSON.parse(cookies.get(AUTH_DATA) || null);

      if (authData && authData.code) {
        cookies.remove(AUTH_DATA);
        dispatch(sendOAuth(authData, service));
      }
    });
};

export const facebookLogIn = () =>
  oAuthLogIn('facebook');

export const googleLogIn = () =>
  oAuthLogIn('google');
