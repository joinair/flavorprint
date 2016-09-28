
import Rx from 'rx';

import identity from 'lodash/identity';
import map from 'lodash/map';

import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

import selectors from 'reducers/selectors';

export const LOAD_RECIPES_REQUEST = 'LOAD_RECIPES_REQUEST';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAILURE = 'LOAD_RECIPES_FAILURE';

export const LOAD_RECIPE_DETAILS_REQUEST = 'LOAD_RECIPE_DETAILS_REQUEST';
export const LOAD_RECIPE_DETAILS_SUCCESS = 'LOAD_RECIPE_DETAILS_SUCCESS';
export const LOAD_RECIPE_DETAILS_FAILURE = 'LOAD_RECIPE_DETAILS_FAILURE';

export const loadRecipes = (params = {}) => {
  const endpoint = '/v3/recommendations';
  const type = 'RECIPE';
  const size = params.size || 8;

  return {
    [API_CALL]: {
      endpoint,
      query: { type, size },
      types: [
        LOAD_RECIPES_REQUEST,
        LOAD_RECIPES_SUCCESS,
        LOAD_RECIPES_FAILURE,
      ],
    },
  };
};

export const loadDetails = recipe => ({
  payload: { recipeId: recipe.itemId, recipe },

  [API_CALL]: {
    endpoint: '',
    url: recipe.detailUrl,
    types: [
      LOAD_RECIPE_DETAILS_REQUEST,
      LOAD_RECIPE_DETAILS_SUCCESS,
      LOAD_RECIPE_DETAILS_FAILURE,
    ],
  },
});

export const loadDetailedRecipes = params => ({
  [CHAIN]: [
    loadRecipes(params),
    () => (dispatch, getState) => Rx.Observable.from(
      map(
        selectors.getRecipes(getState()),
        x => dispatch(loadDetails(x))
      )
    ).flatMap(identity),
  ],
});

export default {
  loadRecipes,
  loadDetails,
  loadDetailedRecipes,
};
