
import Rx from 'rx';

import identity from 'lodash/identity';
import map from 'lodash/map';
import noop from 'lodash/noop';

import { API_CALL } from 'middleware/API';

import selectors from 'reducers/selectors';

import { CONTEXT, LIMIT } from './feed';

export const LOAD_RECIPES_REQUEST = 'LOAD_RECIPES_REQUEST';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAILURE = 'LOAD_RECIPES_FAILURE';

export const LOAD_RECIPE_DETAILS_REQUEST = 'LOAD_RECIPE_DETAILS_REQUEST';
export const LOAD_RECIPE_DETAILS_SUCCESS = 'LOAD_RECIPE_DETAILS_SUCCESS';
export const LOAD_RECIPE_DETAILS_FAILURE = 'LOAD_RECIPE_DETAILS_FAILURE';

export const loadRecipes = (params = {}) => {
  const endpoint = '/v3/recommendations';
  const type = 'RECIPE';
  const size = params.size || LIMIT;

  return {
    payload: { context: CONTEXT.FEED },

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

export const loadDetailedRecipes = params => (dispatch, getState) => {
  const subject = new Rx.Subject();
  const recipes$ = dispatch(loadRecipes(params));

  recipes$.subscribe(noop, noop, () => {
    const details$ = Rx.Observable.from(
      map(
        selectors.getRecipes(getState()),
        x => dispatch(loadDetails(x))
      )
    ).flatMap(identity);

    details$.subscribe(noop, noop, subject.onCompleted);
  });

  return subject;
};

export default {
  loadRecipes,
  loadDetails,
  loadDetailedRecipes,
};
