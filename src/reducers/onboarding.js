
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';

import createReducer from 'helpers/createReducer';

import { normalizeEntities } from 'helpers/reducer';

import {
  LOAD_ONBOARDING_QUESTIONS_SUCCESS,
  LOAD_ONBOARDING_RECIPES_SUCCESS,
  ONBOARDING_ANSWER_QUESTION_SUCCESS,
  ONBOARDING_DESELECT_RECIPE_REQUEST,
  ONBOARDING_DESELECT_RECIPE_SUCCESS,
  ONBOARDING_MARK_ANSWER,
  ONBOARDING_PREVIOUS_STEP,
  ONBOARDING_SELECT_RECIPE_REQUEST,
  ONBOARDING_SELECT_RECIPE_SUCCESS,
  ONBOARDING_SKIP_STEP,
} from 'actions/onboarding';

const initialState = {
  currentStep: 0,
  recipes: {},
  questions: {},
  selectedRecipes: [],
};

const interactionHandler = (state, { payload }) => {
  const { sourceId } = payload;
  const { recipes } = state;
  const recipe = recipes[sourceId];

  return {
    ...state,
    recipes: {
      ...recipes,
      [sourceId]: {
        ...recipe,
        interactions: [
          ...recipe.interactions,
          payload,
        ],
      },
    },
  };
};

export default createReducer(initialState, {
  [ONBOARDING_SKIP_STEP]: state => ({
    ...state,
    currentStep: state.currentStep + 1,
  }),

  [ONBOARDING_PREVIOUS_STEP]: state => ({
    ...state,
    currentStep: Math.max(0, state.currentStep - 1),
  }),

  [LOAD_ONBOARDING_RECIPES_SUCCESS]: (state, { payload }) => ({
    ...state,
    recipes: normalizeEntities(payload),
  }),

  [ONBOARDING_SELECT_RECIPE_REQUEST]: (state, { payload }) => ({
    ...state,
    selectedRecipes: uniq(
      [...state.selectedRecipes, payload.sourceId],
    ),
  }),

  [ONBOARDING_DESELECT_RECIPE_REQUEST]: (state, { payload }) => ({
    ...state,
    selectedRecipes: filter(
      state.selectedRecipes,
      x => x !== payload.sourceId
    ),
  }),

  [ONBOARDING_SELECT_RECIPE_SUCCESS]: interactionHandler,
  [ONBOARDING_DESELECT_RECIPE_SUCCESS]: interactionHandler,

  [LOAD_ONBOARDING_QUESTIONS_SUCCESS]: (state, { payload }) => ({
    ...state,
    questions: payload,
  }),

  [ONBOARDING_ANSWER_QUESTION_SUCCESS]: (state, { payload }) => ({
    ...state,
    questions: {
      ...state.questions,
      payload,
    },
  }),

  [ONBOARDING_MARK_ANSWER]: (state, { payload: { questionId, mark } }) => ({
    ...state,
    questions: {
      ...state.questions,
      [questionId]: {
        ...state.questions[questionId],
        mark,
      },
    },
  }),
});
