
import { createSelector } from 'reselect';
import reject from 'lodash/reject';
import isEmpty from 'lodash/isEmpty';

import { generateOnboardingSteps } from 'helpers/onboarding';

const filterFinishedSteps = steps =>
  reject(steps, { isFinished: true });

export const onboardingSelector = ({ onboarding }) =>
  generateOnboardingSteps(onboarding);

export const isFirstOnboardingStepSelector = state =>
  state.onboarding.currentStep === 0;

export const onboardingCurrentStepSelector = createSelector(
  onboardingSelector,
  state => state.onboarding.currentStep,
  (onboarding, currentStep) =>
    filterFinishedSteps(onboarding)[currentStep]
);

export const onboardingSelectedRecipesSelector = state =>
  state.onboarding.selectedRecipes;

export const isFinishedOnboardingSelector = createSelector(
  onboardingSelector,
  onboarding => isEmpty(filterFinishedSteps(onboarding)),
);

export default {
  isFirstOnboardingStepSelector,
  isFinishedOnboardingSelector,
  onboardingSelector,
  onboardingCurrentStepSelector,
  onboardingSelectedRecipesSelector,
};
