
import assign from 'lodash/assign';

import createReducer from 'helpers/createReducer';

import {
  LOAD_COOKBOOK_COLLECTIONS_SUCCESS,
} from 'actions/cookbook';

const initialState = {
  entries: [],
  numRecipes: 0,
};

const handlers = {
  [LOAD_COOKBOOK_COLLECTIONS_SUCCESS]: (state, action) =>
    assign({}, state, {
      entries: action.payload.values,
      numRecipes: action.payload.numRecipes | 0,
    }),
};

export default createReducer(initialState, handlers);
