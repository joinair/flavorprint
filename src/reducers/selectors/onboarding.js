
import { createSelector } from 'reselect';
import reject from 'lodash/reject';

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

export const isFinishedOnboardingSelector = () =>
  false;

export default {
  isFirstOnboardingStepSelector,
  isFinishedOnboardingSelector,
  onboardingSelector,
  onboardingCurrentStepSelector,
  onboardingSelectedRecipesSelector,
};
