
import Rx from 'rx';

import map from 'lodash/map';
import identity from 'lodash/identity';

import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

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

const loadRecipes = sourceIds => ({
  [API_CALL]: {
    endpoint: '/v3/recommendations',
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

const loadDetails = recipe => ({
  payload: { sourceId: recipe.sourceId },

  [API_CALL]: {
    url: recipe.detailUrl,
    types: [
      LOAD_ONBOARDING_RECIPES_DETAILS_REQUEST,
      LOAD_ONBOARDING_RECIPES_DETAILS_SUCCESS,
      LOAD_ONBOARDING_RECIPES_DETAILS_FAILURE,
    ],
  },
});

export const loadOnboardingData = sourceIds => ({
  [CHAIN]: [
    loadRecipes(sourceIds),
    recipes => dispatch => Rx.Observable.from(
      map(recipes, r => dispatch(loadDetails(r)))
    ).flatMap(identity),
  ],
});

export const selectRecipe = sourceId => ({
  payload: { sourceId },

  [API_CALL]: {
    endpoint: '/custom/recommendations/compatibilities',
    query: {
      sourceIds: sourceId,
    },
    types: [
      ONBOARDING_SELECT_RECIPE_REQUEST,
      ONBOARDING_SELECT_RECIPE_SUCCESS,
      ONBOARDING_SELECT_RECIPE_FAILURE,
    ],
  },
});

export const ONBOARDING_ANSWER_QUESTION_REQUEST = 'ONBOARDING_ANSWER_QUESTION_REQUEST';
export const ONBOARDING_ANSWER_QUESTION_SUCCESS = 'ONBOARDING_ANSWER_QUESTION_SUCCESS';
export const ONBOARDING_ANSWER_QUESTION_FAILURE = 'ONBOARDING_ANSWER_QUESTION_FAILURE';

export const answerQuestion = (questionId, answers) => ({
  [API_CALL]: {
    endpoint: '/custom/users/preferences',
    query: {
      questionId,
      answers: answers.join(','),
    },
    types: [
      ONBOARDING_ANSWER_QUESTION_REQUEST,
      ONBOARDING_ANSWER_QUESTION_SUCCESS,
      ONBOARDING_ANSWER_QUESTION_FAILURE,
    ],
  },
});

export const ONBOARDING_SET_STATE = 'ONBOARDING_SET_STATE';

export const setState = state => ({
  type: ONBOARDING_SET_STATE,
  payload: state,
});

export const ONBOARDING_SKIP_STEP = 'ONBOARDING_SKIP_STEP';

export const skipStep = () => ({
  type: ONBOARDING_SKIP_STEP,
  payload: {},
});

export const ONBOARDING_PREVIOUS_STEP = 'ONBOARDING_PREVIOUS_STEP';

export const previousStep = () => ({
  type: ONBOARDING_PREVIOUS_STEP,
  payload: {},
});

export default {
  ONBOARDING_SKIP_STEP,
  ONBOARDING_PREVIOUS_STEP,

  setState,
  skipStep,
  previousStep,
  loadOnboardingData,
  selectRecipe,
};
