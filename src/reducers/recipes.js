
import reduce from 'lodash/reduce';

import buildREcommendationsReducer from './recommendations';

import {
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_MORE_SUCCESS,
  LOAD_RECIPES_FROM_CACHE,

  LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_RECIPES_COMPATIBILITIES_SUCCESS,
} from 'actions/recipes';

export default buildREcommendationsReducer({
  LOAD_DETAILS_SUCCESS: LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_FROM_CACHE: LOAD_RECIPES_FROM_CACHE,
  LOAD_MORE_SUCCESS: LOAD_RECIPES_MORE_SUCCESS,
  LOAD_SUCCESS: LOAD_RECIPES_SUCCESS,

  idSelector: details => details.recipeId,

  extraHandlers: {
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
  },
});
