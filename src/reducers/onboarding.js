
import uniq from 'lodash/uniq';

import createReducer from 'helpers/createReducer';

import { normalizeEntities } from 'helpers/reducer';

import {
  ONBOARDING_SKIP_STEP,
  ONBOARDING_PREVIOUS_STEP,
  ONBOARDING_SET_STATE,
  LOAD_ONBOARDING_RECIPES_SUCCESS,
  LOAD_ONBOARDING_RECIPES_DETAILS_SUCCESS,
  ONBOARDING_SELECT_RECIPE_REQUEST,
} from 'actions/onboarding';

const initialState = {
  currentStep: 4,
  recipes: {},
  selectedRecipes: [],
  state: {},
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

  [ONBOARDING_SET_STATE]: (state, { payload }) => ({
    ...state,
    state: { ...state.state, ...payload },
  }),

  [LOAD_ONBOARDING_RECIPES_SUCCESS]: (state, { payload }) => ({
    ...state,
    recipes: normalizeEntities(payload),
  }),

  [LOAD_ONBOARDING_RECIPES_DETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    recipes: {
      ...state.recipes,
      [payload.sourceId]: {
        ...state.recipes[payload.sourceId],
        details: payload,
      },
    },
  }),

  [ONBOARDING_SELECT_RECIPE_REQUEST]: (state, { payload }) => ({
    ...state,
    selectedRecipes: uniq(
      [...state.selectedRecipes, payload.sourceId],
    ),
  }),
});
