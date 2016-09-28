
import Rx from 'rx';
import pick from 'lodash/pick';

import apiClient from '../apiClient';

const UPDATE_FIELDS = [
  'addressStreet1',
  'addressStreet2',
  'avatarUrl',
  'city',
  'dateOfBirth',
  'diet',
  'displayName',
  'email',
  'firstName',
  'gender',
  'ipAddressses',
  'lastName',
  'middleInitial',
  'state',
  'zip',
];

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

  const create = () => {
    createUser(pick(data, UPDATE_FIELDS)).subscribe(
      res => subject.onNext(res),
      res => subject.onError(res),
      () => subject.onComplete()
    );
  };

  if (data.id || data.email) {
    loadUser(data.id || data.email).subscribe(res => {
      subject.onNext(res);
      subject.onComplete();
    }, create);
  } else {
    create();
  }

  return subject;
};

export const updateUser = (id, query) => apiClient({
  method: 'put',
  endpoint: `/v3/users/${encodeURIComponent(id)}`,
  query,
});

export const authorizeFromOauth = (data, sessionUserId) => {
  const subject = new Rx.Subject();
  const subs = [
    res => subject.onNext(res),
    res => subject.onError(res),
    () => subject.onComplete(),
  ];

  const create = () =>
    createUser(pick(data, UPDATE_FIELDS)).subscribe(...subs);
  const update = () =>
    loadUser(sessionUserId).subscribe(res => {
      updateUser(sessionUserId, {
        ...pick(res.body, UPDATE_FIELDS),
        ...pick(data, UPDATE_FIELDS),
      }).subscribe(...subs);
    }, create);

  const createUpdateFlow = sessionUserId ? update : create;

  if (data.id || data.email) {
    loadUser(data.id || data.email).subscribe(res => {
      subject.onNext(res);
      subject.onComplete();
    }, createUpdateFlow);
  } else {
    createUpdateFlow();
  }

  return subject;
};

export const formatUserResponse = (provider, user) =>
  JSON.stringify({
    provider,
    profile: user,
  });

export default {
  createUser,
  loadUser,
  updateUser,
  loadOrCreateUser,
  authorizeFromOauth,
  formatUserResponse,
};
