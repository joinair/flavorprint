
import Rx from 'rx';
import qs from 'qs';

import get from 'lodash/get';

import config from 'constants/Config';
import { API_CALL } from 'middleware/API';
import { AUTH_DATA } from 'constants/CookiesKeys';

export const PEAPOD_OAUTH_REQUEST = 'PEAPOD_OAUTH_REQUEST';
export const PEAPOD_OAUTH_SUCCESS = 'PEAPOD_OAUTH_SUCCESS';
export const PEAPOD_OAUTH_FAILURE = 'PEAPOD_OAUTH_FAILURE';

export const PEAPOD_STORE_LOOKUP_REQUEST = 'PEAPOD_STORE_LOOKUP_REQUEST';
export const PEAPOD_STORE_LOOKUP_SUCCESS = 'PEAPOD_STORE_LOOKUP_SUCCESS';
export const PEAPOD_STORE_LOOKUP_FAILURE = 'PEAPOD_STORE_LOOKUP_FAILURE';

export const PEAPOD_COMMIT_CONFIG = 'PEAPOD_COMMIT_CONFIG';
export const PEAPOD_CHANGE_ZIP = 'PEAPOD_CHANGE_ZIP';

const peapodRedrectURI = global.__APP_ENV__ === 'production'
  ? 'http://app.whisk.com/oauth/peapod/callback'
  : 'http://staging.whisk.com/oauth/peapod/callback';

const peapodAuthLink = state => {
  const query = qs.stringify({
    response_type: 'code',
    client_id: config.peapod.clientId,
    state,
    redirect_uri: peapodRedrectURI,
  });
  return `https://www.peapod.com/api/v2.0/login/?${query}`;
};

const storeLookup = zip => ({
  payload: { zip },

  [API_CALL]: {
    endpoint: '/inventories/storeLookup/US:Peapod',
    query: { zip },
    types: [
      PEAPOD_STORE_LOOKUP_REQUEST,
      PEAPOD_STORE_LOOKUP_SUCCESS,
      PEAPOD_STORE_LOOKUP_FAILURE,
    ],
  },
});

export const logIn = () => dispatch => {
  if (global.Platform.OS !== 'browser') return;

  const popupWindowPosition = require('helpers/popupWindowPosition').default;
  const cookies = require('helpers/cookies').default;

  const width = 700;
  const height = 700;
  const { left, top } = popupWindowPosition(width, height);

  const randomState = Math.random().toString().substr(2, 10);

  const logInWindow = window.open(
    peapodAuthLink(randomState),
    'peapodLogIn',
    'toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,' +
    `width=${width},height=${height},left=${left},top=${top}`
  );

  if (logInWindow && logInWindow.focus) {
    logInWindow.focus();
  }

  return Rx.Observable.interval(100)
    .filter(() => logInWindow.closed)
    .take(1)
    .flatMap(() => {
      const authData = JSON.parse(cookies.get(AUTH_DATA) || null);

      if (authData && authData.code) {
        cookies.remove(AUTH_DATA);
        const { code } = authData;

        return dispatch({
          [API_CALL]: {
            endpoint: '/inventories/credentials/US:Peapod',
            method: 'POST',
            query: { code },
            types: [
              PEAPOD_OAUTH_REQUEST,
              PEAPOD_OAUTH_SUCCESS,
              PEAPOD_OAUTH_FAILURE,
            ],
          },
        });
      }

      return Rx.Observable.throw('no data');
    })
    .flatMap((data) => {
      const zip = get(data, 'userInfo.serviceLocation.zip');
      return dispatch(storeLookup(zip));
    });
};

export const commitConfig = () => ({ type: [PEAPOD_COMMIT_CONFIG] });

export const changeZip = zip => dispatch =>
  dispatch(storeLookup(zip)).tap(() => (
    dispatch(commitConfig())
  ));

export default {
  PEAPOD_OAUTH_REQUEST,
  PEAPOD_OAUTH_SUCCESS,
  PEAPOD_OAUTH_FAILURE,
  PEAPOD_COMMIT_CONFIG,

  logIn,
  commitConfig,
  changeZip,
};
