
import assign from 'lodash/assign';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import merge from 'lodash/merge';

import Rx from 'rx';
import request from 'superagent';

import qs from 'qs';

import config from 'constants/Config';
import { FP_SESSION, FP_SESSION_SIG } from 'constants/CookiesKeys';

import { logOut } from 'actions/user';
import { parse as parseCookie } from 'helpers/cookies';

const sendMethod = HTTPMethod =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? 'send'
    : 'query';

const sendArguments = (HTTPMethod, query) =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' });

const apiCall = (
  url = config.api.url,
  endpoint = '',
  method = 'GET',
  query = {},
  headers = {},
  cookies = {},
) => {
  const subject = new Rx.Subject();
  const HTTPMethod = method.toLowerCase();

  const formattedUrl = url.match(/^\/\//)
    ? `${config.api.protocol}:${url}`
    : url;

  let req = request
    [HTTPMethod](formattedUrl + endpoint)
    [sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
    .set(headers);

  if (!isEmpty(cookies)) {
    req = req.set('Cookie', map(cookies, (v, k) => `${k}=${v}`).join('; '));
  }

  if (req.buffer) {
    req = req.buffer();
  }

  req.end((error, data) => {
    if (error) {
      subject.onError({ data, error });
    } else {
      subject.onNext(data);
      subject.onCompleted();
    }
  });

  return subject;
};

export const API_CALL = 'API_CALL';

const nextAction = (action, data) => {
  const next = merge({}, action, data);
  delete next[API_CALL];
  return next;
};

export default store => next => action => {
  if (!get(action, API_CALL)) return next(action);

  const { endpoint, headers, method, query, types, url, cookies } = action[API_CALL];
  const [requestType, successType, failureType] = types;

  const signature = Date.now();
  const sessionKey = get(store.getState(), 'user.sessionKey');
  const sessionSig = get(store.getState(), 'user.sessionSig');

  const completeHeaders = assign(
    { 'Content-Type': 'application/json' },
    sessionKey && sessionSig ? {
      [FP_SESSION]: sessionKey,
      [FP_SESSION_SIG]: sessionSig,
    } : {},
    headers
  );

  next(nextAction(action, { type: requestType, meta: { signature } }));

  const subject = new Rx.Subject();
  const apiRequest = apiCall(url, endpoint, method, query, completeHeaders, cookies);

  const onError = rawData => {
    const payload = get(rawData, 'data.body') || {};

    const data = {
      payload,
      type: failureType,
      meta: { signature, httpCode: rawData.error.status },
      error: true,
    };

    if (rawData.error.status === 401) { store.dispatch(logOut()); }

    next(nextAction(action, data));

    subject.onError(assign({ httpCode: rawData.error.status }, payload));
  };

  const onSuccess = rawData => {
    let payload = get(rawData, 'body');

    const meta = { signature };

    if (rawData.type === 'application/octet-stream') {
      try {
        payload = JSON.parse(rawData.text);
      } catch (e) {
        payload = {};
      }
    } else if (!payload) {
      payload = {};
    }

    let resCookies = map(get(rawData, 'headers.set-cookie', []), parseCookie);
    resCookies = assign(...resCookies);
    if (resCookies[FP_SESSION] && resCookies[FP_SESSION_SIG]) {
      meta.sessionKey = resCookies[FP_SESSION];
      meta.sessionSig = resCookies[FP_SESSION_SIG];
    }

    const data = { meta, payload, type: successType };

    next(nextAction(action, data));

    subject.onNext(payload);
    subject.onCompleted();
  };

  apiRequest.subscribe(onSuccess, onError);

  return subject;
};
