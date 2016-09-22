
import assign from 'lodash/assign';
import omit from 'lodash/omit';

import createReducer from 'helpers/createReducer';

import { ROUTER_DID_CHANGE } from 'actions/router';

const handlers = {
  [ROUTER_DID_CHANGE]: (state, action) =>
    assign(
      {},
      action.payload,
      { previousState: omit(state, 'previousState') }
    ),
};

export default createReducer({}, handlers);
