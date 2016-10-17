
import { API_CALL } from 'middleware/API';

import map from 'lodash/map';

import selectors from 'reducers/selectors';

import {
  loadRecommendations,
  loadDetails,
  loadDetailedRecommendations,
} from './recommendations';

export const LOAD_RECIPES_REQUEST = 'LOAD_RECIPES_REQUEST';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAILURE = 'LOAD_RECIPES_FAILURE';

export const LOAD_RECIPE_DETAILS_REQUEST = 'LOAD_RECIPE_DETAILS_REQUEST';
export const LOAD_RECIPE_DETAILS_SUCCESS = 'LOAD_RECIPE_DETAILS_SUCCESS';
export const LOAD_RECIPE_DETAILS_FAILURE = 'LOAD_RECIPE_DETAILS_FAILURE';

export const LOAD_RECIPES_COMPATIBILITIES_REQUEST =
  'LOAD_RECIPES_COMPATIBILITIES_REQUEST';
export const LOAD_RECIPES_COMPATIBILITIES_SUCCESS =
  'LOAD_RECIPES_COMPATIBILITIES_SUCCESS';
export const LOAD_RECIPES_COMPATIBILITIES_FAILURE =
  'LOAD_RECIPES_COMPATIBILITIES_FAILURE';

export const loadRecipesCompatibilities = () =>
  (dispatch, getState) => dispatch({
    [API_CALL]: {
      endpoint: '/custom/recommendations/compatibilities',
      query: {
        sourceIds: map(selectors.getRecipes(getState()), 'sourceId').join(','),
      },
      types: [
        LOAD_RECIPES_COMPATIBILITIES_REQUEST,
        LOAD_RECIPES_COMPATIBILITIES_SUCCESS,
        LOAD_RECIPES_COMPATIBILITIES_FAILURE,
      ],
    },
  });

export const loadRecipes = params => loadRecommendations([
  LOAD_RECIPES_REQUEST,
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE,
])({ ...params, type: 'RECIPE' });

export const loadRecipeDetails = loadDetails([
  LOAD_RECIPE_DETAILS_REQUEST,
  LOAD_RECIPE_DETAILS_SUCCESS,
  LOAD_RECIPE_DETAILS_FAILURE,
]);

export const loadDetailedRecipes = loadDetailedRecommendations(
  loadRecipes,
  loadRecipeDetails,
);

export default {
  loadRecipesCompatibilities,
  loadRecipes,
  loadRecipeDetails,
  loadDetailedRecipes,
};
