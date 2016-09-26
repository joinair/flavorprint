
import assign from 'lodash/assign';
import map from 'lodash/map';

import createReducer from 'helpers/createReducer';
import { normalizeEntities } from 'helpers/reducer';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPE_DETAILS_SUCCESS,
} from 'actions/recipes';

const initialState = {
  entries: {},
  entriesOrder: [],
};

const handlers = assign({
  [LOAD_RECIPES_SUCCESS]: (state, action) => ({
    entriesOrder: map(action.payload, item => item.itemId),
    entries: normalizeEntities(action.payload),
  }),

  [LOAD_RECIPE_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    entries: {
      ...state.entries,
      [payload.recipeId]: {
        ...state.entries[payload.recipeId],
        details: payload,
      },
    },
  }),
});

export default createReducer(initialState, handlers);
