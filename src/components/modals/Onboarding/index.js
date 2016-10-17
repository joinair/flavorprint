
import { connect } from 'react-redux';
import {
  createSelector,
  createStructuredSelector,
} from 'reselect';

import onboarding from 'actions/onboarding';

import selectors from 'reducers/selectors';

import {
  TYPE_RECIPES,
  TYPE_DIETS,
  TYPE_BUBBLES,
} from 'constants/Onboarding';

import Onboarding from './Onboarding';
import OnboardingRecipesStep from './OnboardingRecipesStep';
import OnboardingDietsStep from './OnboardingDietsStep';
import OnboardingBubblesStep from './OnboardingBubblesStep';

const typeMapping = {
  [TYPE_RECIPES]: OnboardingRecipesStep,
  [TYPE_DIETS]: OnboardingDietsStep,
  [TYPE_BUBBLES]: OnboardingBubblesStep,
};

const stepSelector = createSelector(
  selectors.onboardingCurrentStepSelector,
  currentStep => ({
    ...currentStep,
    type: typeMapping[currentStep.type],
  })
);

const selector = createStructuredSelector({
  step: stepSelector,
  isLastStep: selectors.isLastOnboardingStepSelector,
});

const actions = {
  onNext: () => (dispatch, getState) => {
    const step = stepSelector(getState());
    if (step.onNext) {
      dispatch(step.onNext());
    }

    dispatch(onboarding.skipStep());
  },

  onPrevious: onboarding.previousStep,
};

export default connect(selector, actions)(Onboarding);
