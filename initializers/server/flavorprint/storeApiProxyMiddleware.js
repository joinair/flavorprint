
import Rx from 'rx';

import assign from 'lodash/assign';
import find from 'lodash/find';
import get from 'lodash/get';
import merge from 'lodash/merge';

import { API_CALL } from 'middleware/API';
import { X_SESSION_KEY } from 'constants/Headers';
import routes from './routes';

import { decryptFromHeaders } from './sessionMiddleware';

const matchRoute = (method, endpoint) =>
  get(find(routes, r => r[0] === method && r[1] === endpoint), '2');

const nextAction = (action, data) => {
  const next = merge({}, action, data);
  delete next[API_CALL];
  return next;
};

export default () => store => next => action => {
  const shouldBother = API_CALL in action && !action[API_CALL].url;
  if (!shouldBother) return next(action);

  const info = action[API_CALL];

  const { headers, types } = info;
  const endpoint = `/api${info.endpoint}`;
  const query = info.query || {};
  const method = (info.method || 'get').toLowerCase();
  const [requestType, successType, failureType] = types;

  const signature = Date.now();
  const sessionKey = get(store.getState(), 'user.sessionKey');
  const session = decryptFromHeaders(sessionKey);

  const subject = new Rx.Subject();

  next(nextAction(action, { type: requestType, meta: { signature } }));

  const route = matchRoute(method, endpoint);

  const onSuccess = result => {
    const meta = { signature };
    const payload = result.body || {};

    const key = get(result.headers, X_SESSION_KEY);
    if (key) meta.sessionKey = key;

    const actionData = { meta, payload, type: successType };

    next(nextAction(action, actionData));

    subject.onNext(payload);
    subject.onCompleted();
  };

  const onFailure = err => {
    const payload = err || {};
    const data = {
      payload,
      type: failureType,
      meta: { signature, httpCode: 500 },
      error: true,
    };

    next(nextAction(action, data));
    subject.onError(assign({ httpCode: 500 }, payload));
  };

  if (!route) {
    setTimeout(() => onFailure(), 0);
    return subject;
  }

  const apiRequest = route({
    method,
    headers,
    query,
    endpoint,
    session,
    params: {},
  });

  apiRequest.subscribe(onSuccess, onFailure);

  return subject;
};
