
import reduce from 'lodash/reduce';

import buildREcommendationsReducer from './recommendations';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_MORE_SUCCESS,
  LOAD_RECIPES_FROM_CACHE,

  LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_RECIPES_COMPATIBILITIES_SUCCESS,
} from 'actions/recipes';

import {
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

export default buildREcommendationsReducer({
  LOAD_DETAILS_SUCCESS: LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_FROM_CACHE: LOAD_RECIPES_FROM_CACHE,
  LOAD_MORE_SUCCESS: LOAD_RECIPES_MORE_SUCCESS,
  LOAD_SUCCESS: LOAD_RECIPES_SUCCESS,

  idSelector: details => details.recipeId,

  extraHandlers: {
    [LIKE_RECIPE_SUCCESS]: (state, action) => modifyEntry(
      state,
      action.payload.sourceId,
      entry => ({
        ...entry,
        interactions: [...entry.interactions, action.payload],
      })
    ),

    [DISLIKE_RECIPE_SUCCESS]: (state, action) => modifyEntry(
      state,
      action.payload.sourceId,
      entry => ({
        ...entry,
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
  },
});
