
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

export const isLastOnboardingStepSelector = createSelector(
  state => filterFinishedSteps(onboardingSelector(state)),
  state => state.onboarding.currentStep,
  (onboarding, currentStep) =>
    isEmpty(onboarding) ||
    currentStep >= onboarding.length - 1
);

export const onboardingCurrentStepSelector = createSelector(
  onboardingSelector,
  state => state.onboarding.currentStep,
  (onboarding, currentStep) =>
    filterFinishedSteps(onboarding)[currentStep]
);

export const onboardingSelectedRecipesSelector = state =>
  state.onboarding.selectedRecipes;

export const isFinishedOnboardingSelector = createSelector(
  state => filterFinishedSteps(onboardingSelector(state)),
  state => state.onboarding.currentStep,
  (onboarding, currentStep) =>
    isEmpty(onboarding) ||
    currentStep >= onboarding.length
);

export default {
  isFirstOnboardingStepSelector,
  isLastOnboardingStepSelector,
  isFinishedOnboardingSelector,
  onboardingSelector,
  onboardingCurrentStepSelector,
  onboardingSelectedRecipesSelector,
};
