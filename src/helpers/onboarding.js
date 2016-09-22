
import assign from 'lodash/assign';
import difference from 'lodash/difference';
import every from 'lodash/every';
import includes from 'lodash/includes';
import intersection from 'lodash/intersection';
import map from 'lodash/map';
import size from 'lodash/size';
import union from 'lodash/union';
import without from 'lodash/without';

import {
  STEPS,
  OUTDATED_STEPS,

  ALLERGIES,
  AVOIDANCES,
  SPECIAL_DIETS,
  COMBINED_AVOIDANCES,
} from 'constants/Onboarding';
import { ONBOARDING_LAST_SEEN } from 'constants/LocalStorageKeys';

// Date management

const getDates = () => {
  const storage = require('helpers/storage').default;
  return JSON.parse(storage.get(ONBOARDING_LAST_SEEN));
};

export const getDate = uid => {
  const dates = getDates();
  return (dates && dates[uid]) || null;
};

export const setDate = uid => {
  const storage = require('helpers/storage').default;

  storage.set(
    ONBOARDING_LAST_SEEN,
    JSON.stringify(
      assign(getDates(), { [uid]: Date.now() })
    )
  );
};

// Steps calculations

const hasCompletedAvoidances = onboarding =>
  every(
    [ALLERGIES, AVOIDANCES, SPECIAL_DIETS],
    item => includes(onboarding, item)
  );

export const getGroupId = recipeStep =>
  recipeStep.replace(/RECIPES_/, '');

export const getRecipeStep = recipe =>
  `RECIPES_${recipe.groupId}`;

export const isRecipeStep = step =>
  /RECIPES_/.test(step);

export const getAllSteps = state => {
  const { recipes } = state.preferences.categories;
  const recipesSteps = map(recipes, getRecipeStep);

  return recipesSteps.concat(STEPS).concat(OUTDATED_STEPS);
};

const getPossibleSteps = state =>
  difference(getAllSteps(state), OUTDATED_STEPS);

export const getRemainingSteps = state => {
  const { onboarding } = state.user.profile;
  let steps = difference(getPossibleSteps(state), onboarding);

  if (hasCompletedAvoidances(onboarding)) {
    steps = without(steps, COMBINED_AVOIDANCES);
  }

  return steps;
};

export const getCompletedSteps = state => {
  const { onboarding } = state.user.profile;
  let steps = intersection(getPossibleSteps(state), onboarding);

  if (hasCompletedAvoidances(onboarding)) {
    steps = union(steps, [COMBINED_AVOIDANCES]);
  }

  return steps;
};

export const completePercentage = state =>
  Math.round(
    (size(getCompletedSteps(state)) * 100) / size(getPossibleSteps(state)),
    10
  );

export default {
  getDate,
  setDate,

  getGroupId,
  isRecipeStep,
  getRecipeStep,

  getAllSteps,
  getRemainingSteps,
  completePercentage,
};
