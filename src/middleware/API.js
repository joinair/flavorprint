
import assign from 'lodash/assign';
import get from 'lodash/get';
import merge from 'lodash/merge';

import Rx from 'rx';
import request from 'superagent';

import qs from 'qs';

import { X_SESSION_KEY } from 'constants/Headers';

import { logOut } from 'actions/user';

const sendMethod = HTTPMethod =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? 'send'
    : 'query';

const sendArguments = (HTTPMethod, query) =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' });

const defaultUrl = () =>
  global.Platform.OS === 'browser' &&
  window.location.origin + '/api';

const defaultProtocol = () =>
  global.Platform.OS === 'browser'
    ? window.location.protocol
    : 'https:';

const apiCall = (
  url = defaultUrl(),
  endpoint = '',
  method = 'GET',
  query = {},
  headers = {},
) => {
  const subject = new Rx.Subject();
  const HTTPMethod = method.toLowerCase();

  if (!url) {
    return subject.onError({
      data: {},
      error: { text: 'No url provided' },
    });
  }

  const formattedUrl = url.match(/^\/\//)
    ? `${defaultProtocol()}${url}`
    : url;

  let req = request
    [HTTPMethod](formattedUrl + endpoint)
    [sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
    .set(headers);

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

  const { endpoint, headers, method, query, types, url } = action[API_CALL];
  const [requestType, successType, failureType] = types;

  const signature = Date.now();
  const sessionKey = get(store.getState(), 'user.sessionKey');

  const completeHeaders = assign(
    { 'Content-Type': 'application/json' },
    sessionKey ? {
      [X_SESSION_KEY]: sessionKey,
    } : {},
    headers
  );

  next(nextAction(action, { type: requestType, meta: { signature } }));

  const subject = new Rx.Subject();
  const apiRequest = apiCall(url, endpoint, method, query, completeHeaders);

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

    const key = get(rawData, `headers.${X_SESSION_KEY}`);
    if (key) meta.sessionKey = key;

    const data = { meta, payload, type: successType };

    next(nextAction(action, data));

    subject.onNext(payload);
    subject.onCompleted();
  };

  apiRequest.subscribe(onSuccess, onError);

  return subject;
};
