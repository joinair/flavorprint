
import assign from 'lodash/assign';
import omit from 'lodash/omit';

import createReducer from 'helpers/createReducer';

import {
  LOAD_FEED_REQUEST,
  LOAD_FEED_SUCCESS,
  LOAD_FEED_FAILURE,

  LOAD_NEXT_FEED_PAGE_REQUEST,
  LOAD_NEXT_FEED_PAGE_SUCCESS,
  LOAD_NEXT_FEED_PAGE_FAILURE,
} from 'actions/feed';

import {
  GROUP_IDS,

  START_FETCHING,
  STOP_FETCHING,
} from 'actions/fetching';

const initialState = {};

const startFeedFetching = state =>
  assign({}, state, { [GROUP_IDS.FEED]: true });

const stopFeedFetching = state =>
  omit(state, GROUP_IDS.FEED);

const handlers = {
  [START_FETCHING]: (state, action) => {
    const { groupId, payload } = action.payload;
    return assign({}, state, { [groupId]: payload });
  },

  [STOP_FETCHING]: (state, action) => {
    const { groupId } = action.payload;
    return omit(state, groupId);
  },

  [LOAD_FEED_REQUEST]: startFeedFetching,
  [LOAD_NEXT_FEED_PAGE_REQUEST]: startFeedFetching,

  [LOAD_FEED_SUCCESS]: stopFeedFetching,
  [LOAD_FEED_FAILURE]: stopFeedFetching,
  [LOAD_NEXT_FEED_PAGE_SUCCESS]: stopFeedFetching,
  [LOAD_NEXT_FEED_PAGE_FAILURE]: stopFeedFetching,
};

export default createReducer(initialState, handlers);
