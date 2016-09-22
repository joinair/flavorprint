
import assign from 'lodash/assign';
import get from 'lodash/get';

import { API_CALL } from 'middleware/API';

export const USER_FOLLOWERS = 'USER_FOLLOWERS';
export const USER_FOLLOWING = 'USER_FOLLOWING';

export const LOAD_USER_FOLLOWS_REQUEST = 'LOAD_USER_FOLLOWS_REQUEST';
export const LOAD_USER_FOLLOWS_SUCCESS = 'LOAD_USER_FOLLOWS_SUCCESS';
export const LOAD_USER_FOLLOWS_FAILURE = 'LOAD_USER_FOLLOWS_FAILURE';

export const LOAD_NEXT_USER_FOLLOWS_PAGE_REQUEST =
  'LOAD_NEXT_USER_FOLLOWS_PAGE_REQUEST';

export const LOAD_NEXT_USER_FOLLOWS_PAGE_SUCCESS =
  'LOAD_NEXT_USER_FOLLOWS_PAGE_SUCCESS';

export const LOAD_NEXT_USER_FOLLOWS_PAGE_FAILURE =
  'LOAD_NEXT_USER_FOLLOWS_PAGE_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const loadUserFollows =
  (nextPage, followType) => (dispatch, getState) => {
    const state = getState();
    const offset = nextPage
      ? get(state, 'cookbook.follows.paging.offset')
      : 0;
    const type = followType || get(state, 'cookbook.follows.type');
    const username = get(state, 'router.params.username');

    const query = assign(
      { offset },
      type === USER_FOLLOWERS
        ? { followers: username }
        : { followTargets: username }
    );

    const types = nextPage
      ? [
        LOAD_NEXT_USER_FOLLOWS_PAGE_REQUEST,
        LOAD_NEXT_USER_FOLLOWS_PAGE_SUCCESS,
        LOAD_NEXT_USER_FOLLOWS_PAGE_FAILURE,
      ] : [
        LOAD_USER_FOLLOWS_REQUEST,
        LOAD_USER_FOLLOWS_SUCCESS,
        LOAD_USER_FOLLOWS_FAILURE,
      ];

    return dispatch({
      payload: {
        type,
      },

      [API_CALL]: {
        endpoint: '/users',
        query,
        types,
      },
    });
  };

export const followUser = username => ({
  meta: { authenticationRequired: true },
  payload: { username },

  [API_CALL]: {
    endpoint: `/users/${username}/follow`,
    method: 'POST',
    types: [
      FOLLOW_USER_REQUEST,
      FOLLOW_USER_SUCCESS,
      FOLLOW_USER_FAILURE,
    ],
  },
});

export const unfollowUser = username => ({
  meta: { authenticationRequired: true },
  payload: { username },

  [API_CALL]: {
    endpoint: `/users/${username}/follow`,
    method: 'DELETE',
    types: [
      UNFOLLOW_USER_REQUEST,
      UNFOLLOW_USER_SUCCESS,
      UNFOLLOW_USER_FAILURE,
    ],
  },
});

export default { loadUserFollows, followUser, unfollowUser };
