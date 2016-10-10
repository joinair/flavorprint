
import assign from 'lodash/assign';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import uniq from 'lodash/uniq';

import createReducer from 'helpers/createReducer';
import { normalizeEntities } from 'helpers/reducer';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_MORE_SUCCESS,
  LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_RECIPES_COMPATIBILITIES_SUCCESS,
} from 'actions/recipes';

const initialState = {
  entries: {},
  entriesOrder: [],
  canRequestNext: true,
};

const handlers = assign({
  [LOAD_RECIPES_SUCCESS]: (state, action) => ({
    entriesOrder: map(action.payload, item => item.itemId),
    entries: normalizeEntities(action.payload),
    canRequestNext: true,
  }),

  [LOAD_RECIPES_MORE_SUCCESS]: (state, action) => ({
    entriesOrder: uniq([
      ...state.entriesOrder,
      ...map(action.payload, item => item.itemId),
    ]),
    entries: {
      ...state.entries,
      ...normalizeEntities(action.payload),
    },
    canRequestNext: !!action.payload && action.payload.length > 0,
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

  [LOAD_RECIPES_COMPATIBILITIES_SUCCESS]: (state, { payload }) => ({
    ...state,
    entries: reduce(payload, (acc, val) => ({
      ...acc,
      [val.itemId]: {
        ...acc[val.itemId],
        ...val,
      },
    }), state.entries),
  }),
});

export default createReducer(initialState, handlers);
