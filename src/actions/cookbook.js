
import assign from 'lodash/assign';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { API_CALL } from 'middleware/API';
import { COLLECTION } from 'constants/QueryParams';

import {
  LOAD_FEED_REQUEST,
  LOAD_FEED_SUCCESS,
  LOAD_FEED_FAILURE,

  LOAD_NEXT_FEED_PAGE_REQUEST,
  LOAD_NEXT_FEED_PAGE_SUCCESS,
  LOAD_NEXT_FEED_PAGE_FAILURE,

  CONTEXT,
} from './feed';

export const LOAD_COOKBOOK_COLLECTIONS_REQUEST =
  'LOAD_COOKBOOK_COLLECTIONS_REQUEST';

export const LOAD_COOKBOOK_COLLECTIONS_SUCCESS =
  'LOAD_COOKBOOK_COLLECTIONS_SUCCESS';

export const LOAD_COOKBOOK_COLLECTIONS_FAILURE =
  'LOAD_COOKBOOK_COLLECTIONS_FAILURE';

export const LOAD_COOKBOOK_USER_REQUEST = 'LOAD_COOKBOOK_USER_REQUEST';
export const LOAD_COOKBOOK_USER_SUCCESS = 'LOAD_COOKBOOK_USER_SUCCESS';
export const LOAD_COOKBOOK_USER_FAILURE = 'LOAD_COOKBOOK_USER_FAILURE';

export const loadCollections = query => ({
  [API_CALL]: {
    endpoint: '/cookbook/collections',
    query,
    types: [
      LOAD_COOKBOOK_COLLECTIONS_REQUEST,
      LOAD_COOKBOOK_COLLECTIONS_SUCCESS,
      LOAD_COOKBOOK_COLLECTIONS_FAILURE,
    ],
  },
});

export const loadRecipes = (nextPage, nextState) => (dispatch, getState) => {
  const state = getState();
  const { location, params } = isEmpty(nextState) ? state.router : nextState;
  const { query } = location || nextState;
  const { username } = params;

  const collectionId = query[COLLECTION];
  const offset = nextPage ? get(state, 'feed.paging.offset') : 0;

  const requestQuery = {};

  const isShared = username !== get(state.user, 'profile.username');

  if (username) {
    requestQuery.username = username;
  }

  if (collectionId) {
    requestQuery.collectionId = collectionId;
  }

  const types = nextPage
    ? [
      LOAD_NEXT_FEED_PAGE_REQUEST,
      LOAD_NEXT_FEED_PAGE_SUCCESS,
      LOAD_NEXT_FEED_PAGE_FAILURE,
    ] : [
      LOAD_FEED_REQUEST,
      LOAD_FEED_SUCCESS,
      LOAD_FEED_FAILURE,
    ];

  return dispatch({
    payload: {
      context: isShared ? CONTEXT.OTHER_USER_COOKBOOK : CONTEXT.COOKBOOK,
    },

    [API_CALL]: {
      endpoint: '/cookbook/recipes',
      query: assign({ offset, limit: 24 }, requestQuery),
      types,
    },
  });
};

export const loadUser = identifier => (dispatch, getState) =>
  dispatch({
    meta: {
      currentUserRefresh: (
        identifier === get(getState(), 'user.profile.username') ||
        identifier === get(getState(), 'user.uid')
      ),
    },

    [API_CALL]: {
      endpoint: `/users/${identifier}`,
      types: [
        LOAD_COOKBOOK_USER_REQUEST,
        LOAD_COOKBOOK_USER_SUCCESS,
        LOAD_COOKBOOK_USER_FAILURE,
      ],
    },
  });

export default { loadCollections, loadRecipes, loadUser };
