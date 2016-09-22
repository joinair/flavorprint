
import some from 'lodash/some';

import createReducer from 'helpers/createReducer';

import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from 'actions/notifications';

const initialState = [];

const handlers = {
  [HIDE_NOTIFICATION]: (state) =>
    state.slice(1),

  [SHOW_NOTIFICATION]: (state, action) =>
    some(state, { uuid: action.payload.uuid })
      ? state
      : state.concat(action.payload),
};

export default createReducer(initialState, handlers);
