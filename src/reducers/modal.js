
import get from 'lodash/get';

import createReducer from 'helpers/createReducer';

import { ROUTER_DID_CHANGE } from 'actions/router';

const initialState = {
  type: null,
  payload: null,
  settings: {},
};

const handlers = {
  [ROUTER_DID_CHANGE]: (_state, action) =>
    get(action.payload.location, 'state.modal', initialState),
};

export default createReducer(initialState, handlers);
