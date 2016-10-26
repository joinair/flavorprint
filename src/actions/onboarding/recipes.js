
import Rx from 'rx';

import map from 'lodash/map';

import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

import { likeState } from 'helpers/interactions';

export const LOAD_ONBOARDING_RECIPES_REQUEST = 'LOAD_ONBOARDING_RECIPES_REQUEST';
export const LOAD_ONBOARDING_RECIPES_SUCCESS = 'LOAD_ONBOARDING_RECIPES_SUCCESS';
export const LOAD_ONBOARDING_RECIPES_FAILURE = 'LOAD_ONBOARDING_RECIPES_FAILURE';

export const LOAD_ONBOARDING_RECIPES_DETAILS_REQUEST =
  'LOAD_ONBOARDING_RECIPES_DETAILS_REQUEST';
export const LOAD_ONBOARDING_RECIPES_DETAILS_SUCCESS =
  'LOAD_ONBOARDING_RECIPES_DETAILS_SUCCESS';
export const LOAD_ONBOARDING_RECIPES_DETAILS_FAILURE =
  'LOAD_ONBOARDING_RECIPES_DETAILS_FAILURE';

export const ONBOARDING_SELECT_RECIPE_REQUEST = 'ONBOARDING_SELECT_RECIPE_REQUEST';
export const ONBOARDING_SELECT_RECIPE_SUCCESS = 'ONBOARDING_SELECT_RECIPE_SUCCESS';
export const ONBOARDING_SELECT_RECIPE_FAILURE = 'ONBOARDING_SELECT_RECIPE_FAILURE';

export const ONBOARDING_DESELECT_RECIPE_REQUEST = 'ONBOARDING_DESELECT_RECIPE_REQUEST';
export const ONBOARDING_DESELECT_RECIPE_SUCCESS = 'ONBOARDING_DESELECT_RECIPE_SUCCESS';
export const ONBOARDING_DESELECT_RECIPE_FAILURE = 'ONBOARDING_DESELECT_RECIPE_FAILURE';

export const loadOnboardingRecipes = sourceIds => ({
  [API_CALL]: {
    endpoint: '/custom/onboarding/recipes',
    query: {
      sourceIds: sourceIds.join(','),
    },
    types: [
      LOAD_ONBOARDING_RECIPES_REQUEST,
      LOAD_ONBOARDING_RECIPES_SUCCESS,
      LOAD_ONBOARDING_RECIPES_FAILURE,
    ],
  },
});

const likeRecipe = sourceId => ({
  payload: { sourceId },

  [API_CALL]: {
    endpoint: '/custom/users/interactions',
    method: 'POST',
    query: {
      interaction: 'LIKE',
      sourceId,
    },
    types: [
      ONBOARDING_SELECT_RECIPE_REQUEST,
      ONBOARDING_SELECT_RECIPE_SUCCESS,
      ONBOARDING_SELECT_RECIPE_FAILURE,
    ],
  },
});

const unlikeRecipe = sourceId => (dispatch, getState) => {
  const recipe = getState().onboarding.recipes[sourceId];

  if (recipe && likeState(recipe) === 'liked') {
    return dispatch({
      payload: { sourceId },

      [API_CALL]: {
        endpoint: '/custom/users/interactions',
        method: 'POST',
        query: {
          interaction: 'DISLIKE_FLAVOR',
          sourceId,
        },
        types: [
          ONBOARDING_DESELECT_RECIPE_REQUEST,
          ONBOARDING_DESELECT_RECIPE_SUCCESS,
          ONBOARDING_DESELECT_RECIPE_FAILURE,
        ],
      },
    });
  }
};

export const selectRecipe = (select, deselect) => ({
  [CHAIN]: [
    likeRecipe(select),
    ...map(deselect, id => () => unlikeRecipe(id)),
  ],
});
