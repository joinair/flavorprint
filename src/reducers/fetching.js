
import assign from 'lodash/assign';
import omit from 'lodash/omit';

import createReducer from 'helpers/createReducer';

import {
  START_FETCHING,
  STOP_FETCHING,
} from 'actions/fetching';

const initialState = {};

const handlers = {
  [START_FETCHING]: (state, action) => {
    const { groupId, payload } = action.payload;
    return assign({}, state, { [groupId]: payload });
  },

  [STOP_FETCHING]: (state, action) => {
    const { groupId } = action.payload;
    return omit(state, groupId);
  },
};

export default createReducer(initialState, handlers);
