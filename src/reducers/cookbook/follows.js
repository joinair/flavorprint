
import assign from 'lodash/assign';
import map from 'lodash/map';

import createReducer from 'helpers/createReducer';

import {
  LOAD_USER_FOLLOWS_REQUEST,
  LOAD_USER_FOLLOWS_SUCCESS,
  LOAD_USER_FOLLOWS_FAILURE,

  LOAD_NEXT_USER_FOLLOWS_PAGE_REQUEST,
  LOAD_NEXT_USER_FOLLOWS_PAGE_SUCCESS,
  LOAD_NEXT_USER_FOLLOWS_PAGE_FAILURE,

  FOLLOW_USER_REQUEST,
  FOLLOW_USER_FAILURE,

  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_FAILURE,
} from 'actions/follows';

const initialState = {
  isFetching: false,

  entries: [],
  paging: {
    offset: 0,
    total: 0,
  },
  type: null,
};

const handleFailure = state =>
  assign(state, { isFetching: false });

const handleUserFollow = follow => (state, action) =>
  assign({}, state, {
    entries: map(state.entries, user =>
      user.username !== action.payload.username
        ? user
        : assign({}, user, { isFollowTarget: follow })),
  });

const handlers = {
  [LOAD_USER_FOLLOWS_REQUEST]: (state, action) =>
    assign({}, initialState, { isFetching: true, type: action.payload.type }),

  [LOAD_NEXT_USER_FOLLOWS_PAGE_REQUEST]: (state, action) =>
    assign({}, state, { isFetching: true, type: action.payload.type }),

  [LOAD_USER_FOLLOWS_SUCCESS]: (state, action) => ({
    isFetching: false,

    entries: action.payload.values,
    paging: action.payload.paging,
    type: action.payload.type,
  }),

  [LOAD_NEXT_USER_FOLLOWS_PAGE_SUCCESS]: (state, action) => ({
    isFetching: false,

    entries: state.entries.concat(action.payload.values),
    paging: action.payload.paging,
    type: action.payload.type,
  }),

  [LOAD_USER_FOLLOWS_FAILURE]: handleFailure,
  [LOAD_NEXT_USER_FOLLOWS_PAGE_FAILURE]: handleFailure,

  [FOLLOW_USER_REQUEST]: handleUserFollow(true),
  [FOLLOW_USER_FAILURE]: handleUserFollow(false),

  [UNFOLLOW_USER_REQUEST]: handleUserFollow(false),
  [UNFOLLOW_USER_FAILURE]: handleUserFollow(true),
};

export default createReducer(initialState, handlers);
