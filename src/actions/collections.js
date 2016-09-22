
import assign from 'lodash/assign';
import uniqueId from 'lodash/uniqueId';

import { API_CALL } from 'middleware/API';

export const LOAD_COLLECTIONS_REQUEST = 'LOAD_COLLECTIONS_REQUEST';
export const LOAD_COLLECTIONS_SUCCESS = 'LOAD_COLLECTIONS_SUCCESS';
export const LOAD_COLLECTIONS_FAILURE = 'LOAD_COLLECTIONS_FAILURE';

export const SAVE_COLLECTION_REQUEST = 'SAVE_COLLECTION_REQUEST';
export const SAVE_COLLECTION_SUCCESS = 'SAVE_COLLECTION_SUCCESS';
export const SAVE_COLLECTION_FAILURE = 'SAVE_COLLECTION_FAILURE';

export const DESTROY_COLLECTION_REQUEST = 'DESTROY_COLLECTION_REQUEST';
export const DESTROY_COLLECTION_SUCCESS = 'DESTROY_COLLECTION_SUCCESS';
export const DESTROY_COLLECTION_FAILURE = 'DESTROY_COLLECTION_FAILURE';

export const load = () => ({
  [API_CALL]: {
    meta: { authenticationRequired: true },
    endpoint: '/cookbook/collections',
    types: [
      LOAD_COLLECTIONS_REQUEST,
      LOAD_COLLECTIONS_SUCCESS,
      LOAD_COLLECTIONS_FAILURE,
    ],
  },
});

export const save = (data = {}, context = 'Cookbook') => {
  const endpoint = data.id
    ? `/cookbook/collections/${data.id}`
    : '/cookbook/collections';

  const payload = data.id
    ? data
    : assign({}, data, { _cid: uniqueId() });

  return {
    meta: { authenticationRequired: true, context },
    payload,

    [API_CALL]: {
      endpoint,
      method: 'POST',
      query: data,
      types: [
        SAVE_COLLECTION_REQUEST,
        SAVE_COLLECTION_SUCCESS,
        SAVE_COLLECTION_FAILURE,
      ],
    },
  };
};

export const destroy = id => ({
  meta: { authenticationRequired: true },
  payload: {
    id,
  },

  [API_CALL]: {
    method: 'DELETE',
    endpoint: `/cookbook/collections/${id}`,
    types: [
      DESTROY_COLLECTION_REQUEST,
      DESTROY_COLLECTION_SUCCESS,
      DESTROY_COLLECTION_FAILURE,
    ],
  },
});

export default { load, save, destroy };
