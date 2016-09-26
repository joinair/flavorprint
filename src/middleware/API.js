
import assign from 'lodash/assign';
import get from 'lodash/get';
import merge from 'lodash/merge';

import Rx from 'rx';
import request from 'superagent';

import qs from 'qs';

import config from 'constants/Config';

import { logOut } from 'actions/user';

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
  headers = {}
) => {
  const subject = new Rx.Subject();
  const HTTPMethod = method.toLowerCase();

  const formattedUrl = url.match(/^\/\//)
    ? `${config.api.protocol}:${url}`
    : url;

  request
    [HTTPMethod](formattedUrl + endpoint)
    [sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
    .set(headers)
    .end((error, data) => {
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

export default region => store => next => action => {
  if (!get(action, API_CALL)) return next(action);

  const { endpoint, headers, method, query, types, url } = action[API_CALL];
  const [requestType, successType, failureType] = types;

  const signature = Date.now();
  const JWTHeader = get(store.getState(), 'user.JWTHeader');

  const completeHeaders = assign(
    { 'Content-Type': 'application/json' },

    global.__APP_ENV__ !== 'development' && region
      ? { whisklanguage: 'en', whiskregion: region }
      : {},

    JWTHeader && (!url || url === config.api.url)
      ? { Authorization: JWTHeader }
      : {},

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
    const newJWTHeader = get(rawData, 'headers.authorization');

    if (rawData.type === 'application/octet-stream') {
      payload = JSON.parse(rawData.text);
    } else if (!payload) {
      payload = {};
    }

    if (newJWTHeader) { meta.JWTHeader = newJWTHeader; }

    const data = { meta, payload, type: successType };

    next(nextAction(action, data));

    subject.onNext(payload);
    subject.onCompleted();
  };

  apiRequest.subscribe(onSuccess, onError);

  return subject;
};
