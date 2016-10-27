
import Rx from 'rx';

import apiClient from './apiClient';

export const verifyUser = handler => data => {
  const { userId } = data.session;

  if (!userId) {
    const subject = new Rx.AsyncSubject();
    subject.onError({ error: 'Please authorized' });
    return subject;
  }

  return handler(data);
};

export const passThrough = _endpoint => ({ method, endpoint, query }) => {
  const regex = /^\/api(\/.*)?$/i;
  const match = endpoint.match(regex);
  const apiEndpoint = _endpoint || match[1];

  return apiClient({ method, query, endpoint: apiEndpoint })
    .map(x => x.text)
    .map(JSON.parse)
    .map(body => ({ body }));
};

export const passThroughWithUser = endpoint => verifyUser(
  data => passThrough(endpoint(data.session.userId, data))(data)
);

export default {
  verifyUser,
  passThrough,
  passThroughWithUser,
};
