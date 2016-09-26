
import get from 'lodash/get';
import noop from 'lodash/noop';

import Rx from 'rx';

import { API_CALL } from 'middleware/API';

import fetching from './fetching';

export const FEED_CLEAN = 'FEED_CLEAN';

export const LOAD_FEED_REQUEST = 'LOAD_FEED_REQUEST';
export const LOAD_FEED_SUCCESS = 'LOAD_FEED_SUCCESS';
export const LOAD_FEED_FAILURE = 'LOAD_FEED_FAILURE';

export const LOAD_NEXT_FEED_PAGE_REQUEST = 'LOAD_NEXT_FEED_PAGE_REQUEST';
export const LOAD_NEXT_FEED_PAGE_SUCCESS = 'LOAD_NEXT_FEED_PAGE_SUCCESS';
export const LOAD_NEXT_FEED_PAGE_FAILURE = 'LOAD_NEXT_FEED_PAGE_FAILURE';

export const CONTEXT = {
  FEED: 'FEED',
};

export const LIMIT = 24;

const shouldReload = (context, state) => {
  if (context !== state.feed.context) {
    return true;
  }

  const prevLocation = get(state.router, 'previousState.location');

  if (!prevLocation) { return true; }

  const nextLocation = state.router.location;

  if (nextLocation.action !== 'POP') { return true; }

  return nextLocation.pathname === prevLocation.pathname;
};

const firstPageLoad = {
  payload: {
    context: CONTEXT.FEED,
  },

  [API_CALL]: {
    endpoint: '/feed',
    query: { limit: LIMIT },
    types: [
      LOAD_FEED_REQUEST,
      LOAD_FEED_SUCCESS,
      LOAD_FEED_FAILURE,
    ],
  },
};

const nextPageLoad = (dispatch, getState) => {
  const feed = getState().feed;

  const { cursorId } = feed;
  const { offset } = feed.paging;

  const nextPageLoad$ = dispatch({
    [API_CALL]: {
      endpoint: '/feed',
      query: { offset, limit: LIMIT, fid: cursorId },
      types: [
        LOAD_NEXT_FEED_PAGE_REQUEST,
        LOAD_NEXT_FEED_PAGE_SUCCESS,
        LOAD_NEXT_FEED_PAGE_FAILURE,
      ],
    },
  })
  .catch(() => {
    dispatch(fetching.start(fetching.GROUP_IDS.HOME_PAGE));

    const onComplete = () =>
      dispatch(fetching.stop(fetching.GROUP_IDS.HOME_PAGE));

    return dispatch(firstPageLoad).tap(noop, onComplete, onComplete);
  });

  nextPageLoad$.subscribe(noop, noop);

  return nextPageLoad$;
};

export const load = nextPage => (dispatch, getState) => {
  if (nextPage) { return nextPageLoad(dispatch, getState); }

  return shouldReload(CONTEXT.FEED, getState())
    ? dispatch(firstPageLoad)
    : Rx.Observable.empty();
};

export const clean = () => ({
  type: FEED_CLEAN,
});

export default { load, clean };
