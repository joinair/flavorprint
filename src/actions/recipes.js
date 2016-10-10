
import { API_CALL } from 'middleware/API';

import map from 'lodash/map';

import selectors from 'reducers/selectors';

import buildRecommendationsActions from './recommendations';

export const LOAD_RECIPES_REQUEST = 'LOAD_RECIPES_REQUEST'; export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAILURE = 'LOAD_RECIPES_FAILURE';

export const LOAD_RECIPES_MORE_REQUEST = 'LOAD_RECIPES_MORE_REQUEST';
export const LOAD_RECIPES_MORE_SUCCESS = 'LOAD_RECIPES_MORE_SUCCESS';
export const LOAD_RECIPES_MORE_FAILURE = 'LOAD_RECIPES_MORE_FAILURE';

export const LOAD_RECIPES_FROM_CACHE = 'LOAD_RECIPES_FROM_CACHE';

export const LOAD_RECIPE_DETAILS_REQUEST = 'LOAD_RECIPE_DETAILS_REQUEST';
export const LOAD_RECIPE_DETAILS_SUCCESS = 'LOAD_RECIPE_DETAILS_SUCCESS';
export const LOAD_RECIPE_DETAILS_FAILURE = 'LOAD_RECIPE_DETAILS_FAILURE';

export const LOAD_RECIPES_COMPATIBILITIES_REQUEST =
  'LOAD_RECIPES_COMPATIBILITIES_REQUEST';
export const LOAD_RECIPES_COMPATIBILITIES_SUCCESS =
  'LOAD_RECIPES_COMPATIBILITIES_SUCCESS';
export const LOAD_RECIPES_COMPATIBILITIES_FAILURE =
  'LOAD_RECIPES_COMPATIBILITIES_FAILURE';

const recipesActions = buildRecommendationsActions({
  LOAD_REQUEST: LOAD_RECIPES_REQUEST,
  LOAD_SUCCESS: LOAD_RECIPES_SUCCESS,
  LOAD_FAILURE: LOAD_RECIPES_FAILURE,
  LOAD_MORE_REQUEST: LOAD_RECIPES_MORE_REQUEST,
  LOAD_MORE_SUCCESS: LOAD_RECIPES_MORE_SUCCESS,
  LOAD_MORE_FAILURE: LOAD_RECIPES_MORE_FAILURE,
  LOAD_FROM_CACHE: LOAD_RECIPES_FROM_CACHE,
  LOAD_DETAILS_REQUEST: LOAD_RECIPE_DETAILS_REQUEST,
  LOAD_DETAILS_SUCCESS: LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_DETAILS_FAILURE: LOAD_RECIPE_DETAILS_FAILURE,

  recommendationsSelector: selectors.getSortedRecipes,
  cacheSelector: state => state.recipes.paginationCache,
  type: 'RECIPE',
});

export const loadRecipesCompatibilities =
  userId =>
  (dispatch, getState) => dispatch({
    [API_CALL]: {
      endpoint: `/v3/recommendations/${userId}/compatibilities`,
      query: {
        userId,
        sourceIds: map(selectors.getRecipes(getState()), 'sourceId').join(','),
      },
      types: [
        LOAD_RECIPES_COMPATIBILITIES_REQUEST,
        LOAD_RECIPES_COMPATIBILITIES_SUCCESS,
        LOAD_RECIPES_COMPATIBILITIES_FAILURE,
      ],
    },
  });

export const loadRecipes = recipesActions.load;
export const loadRecipeDetails = recipesActions.loadDetails;
export const loadDetailedRecipes = recipesActions.loadDetailed;

export default {
  loadRecipesCompatibilities,
  loadRecipes,
  loadRecipeDetails,
  loadDetailedRecipes,
};
