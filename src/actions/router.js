
import assign from 'lodash/assign';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { parse } from 'qs';

import { HISTORY_CALL } from 'middleware/history';

export const ROUTER_DID_CHANGE = 'ROUTER_DID_CHANGE';

export const routerDidChange = state => (dispatch, getState) => {
  const prevLocation = getState().router.location;
  const nextLocation = assign(
    {},
    state.location,
    { query: parse((get(state.location, 'search', '')).substr(1)) }
  );

  const synthetic = prevLocation &&
    nextLocation.pathname === prevLocation.pathname &&
    isEqual(nextLocation.query, prevLocation.query) &&
    !isEqual(
      get(nextLocation, 'state.modal'),
      get(prevLocation, 'state.modal')
    ) &&
    (
      !get(nextLocation, 'state.forceReload') ||
        get(nextLocation, 'state.forceReload') !==
        get(prevLocation, 'state.modal.type')
    );

  return dispatch({
    type: ROUTER_DID_CHANGE,
    payload: assign({ synthetic }, state, {
      location: nextLocation,
    }),
  });
};

export const goBack = () => ({
  [HISTORY_CALL]: {
    method: 'goBack',
  },
});

export const push = (pathname, query, state) => ({
  [HISTORY_CALL]: {
    method: 'push',
    pathname,
    query,
    state,
  },
});

export const replace = (pathname, query, state) => ({
  [HISTORY_CALL]: {
    method: 'replace',
    pathname,
    query,
    state,
  },
});

export default { goBack, routerDidChange, replace, push };
