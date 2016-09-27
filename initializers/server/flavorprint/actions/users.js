
import Rx from 'rx';

import apiClient from '../apiClient';

export const createUser = query => apiClient({
  method: 'post',
  query: {
    diet: 'EAT_MOST_THINGS',
    ...query,
  },
  endpoint: '/v3/users',
});

export const loadUser = userId => apiClient({
  method: 'get',
  endpoint: `/v3/users/${encodeURIComponent(userId)}`,
});

export const loadOrCreateUser = data => {
  const subject = new Rx.Subject();

  loadUser(data.email).subscribe(res => {
    subject.onNext(res);
    subject.onComplete();
  }, () => {
    createUser(data).subscribe(
      subject.onNext,
      subject.onError,
      subject.onComplete
    );
  });

  return subject;
};

export default {
  createUser,
  loadUser,
  loadOrCreateUser,
};
