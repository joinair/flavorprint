
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import createReducer from 'helpers/createReducer';
import { normalizeEntities } from 'helpers/reducer';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_RECIPES_COMPATIBILITIES_SUCCESS,
} from 'actions/recipes';

import {
  LIKE_RECIPE_REQUEST,
  DISLIKE_RECIPE_REQUEST,
  LIKE_RECIPE_SUCCESS,
  DISLIKE_RECIPE_SUCCESS,
} from 'actions/recipe';

const modifyEntry = (state, sourceId, modifier) => ({
  ...state,
  entries: {
    ...state.entries,
    [sourceId]: modifier(state.entries[sourceId]),
  },
});

const initialState = {
  entries: {},
  entriesOrder: [],
};

export default createReducer(initialState, {
  [LOAD_RECIPES_SUCCESS]: (state, { payload }) => ({
    entriesOrder: map(payload, 'sourceId'),
    entries: normalizeEntities(payload),
  }),

  [LOAD_RECIPE_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    entries: {
      ...state.entries,
      [payload.sourceId]: {
        ...state.entries[payload.sourceId],
        details: payload,
      },
    },
  }),

  [LIKE_RECIPE_REQUEST]: (state, action) => modifyEntry(
    state,
    action.payload.sourceId,
    entry => ({
      ...entry,
      pendingInteraction: 'liked',
    })
  ),

  [LIKE_RECIPE_SUCCESS]: (state, action) => modifyEntry(
    state,
    action.payload.sourceId,
    entry => ({
      ...entry,
      pendingInteraction: undefined,
      interactions: [...entry.interactions, action.payload],
    })
  ),

  [DISLIKE_RECIPE_REQUEST]: (state, action) => modifyEntry(
    state,
    action.payload.sourceId,
    entry => ({
      ...entry,
      pendingInteraction: 'disliked',
    })
  ),

  [DISLIKE_RECIPE_SUCCESS]: (state, action) => modifyEntry(
    state,
    action.payload.sourceId,
    entry => ({
      ...entry,
      pendingInteraction: undefined,
      interactions: [...entry.interactions, action.payload],
    })
  ),

  [LOAD_RECIPES_COMPATIBILITIES_SUCCESS]: (state, { payload }) => reduce(
    payload,
    (acc, val) => modifyEntry(acc, val.sourceId, entry => ({
      ...entry,
      compatibilityScore: val.compatibilityScore,
    })),
    state
  ),
});
