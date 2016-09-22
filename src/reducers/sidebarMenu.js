
import createReducer from 'helpers/createReducer';

import {
  OPEN_SIDEBAR_MENU,
  CLOSE_SIDEBAR_MENU,
} from 'actions/sidebarMenu';

import {
  ROUTER_DID_CHANGE,
} from 'actions/router';

const initialState = {
  isOpen: false,
};

const handlers = {
  [OPEN_SIDEBAR_MENU]: () =>
    ({ isOpen: true }),

  [CLOSE_SIDEBAR_MENU]: () =>
    ({ isOpen: false }),

  [ROUTER_DID_CHANGE]: state =>
    state.isOpen
      ? ({ isOpen: false })
      : state,
};

export default createReducer(initialState, handlers);
