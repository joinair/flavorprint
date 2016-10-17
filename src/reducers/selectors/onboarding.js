
import { createSelector } from 'reselect';

import { generateOnboardingSteps } from 'helpers/onboarding';

export const onboardingSelector = ({ onboarding }) =>
  generateOnboardingSteps(onboarding);

export const isLastOnboardingStepSelector = createSelector(
  onboardingSelector,
  state => state.onboarding.currentStep,
  (onboarding, currentStep) => onboarding.length === currentStep + 1
);

export const onboardingCurrentStepSelector = createSelector(
  onboardingSelector,
  state => state.onboarding.currentStep,
  (onboarding, currentStep) => onboarding[currentStep]
);

export const onboardingSelectedRecipesSelector = state =>
  state.onboarding.selectedRecipes;

export default {
  isLastOnboardingStepSelector,
  onboardingSelector,
  onboardingCurrentStepSelector,
  onboardingSelectedRecipesSelector,
};
