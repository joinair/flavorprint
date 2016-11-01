
import { connect } from 'react-redux';
import {
  createSelector,
  createStructuredSelector,
} from 'reselect';

import onboarding from 'actions/onboarding';
import router from 'actions/router';

import selectors from 'reducers/selectors';

import {
  TYPE_RECIPES,
  TYPE_DIETS,
  TYPE_BUBBLES,
} from 'constants/Onboarding';
import { FLAVORPRINT } from 'constants/Routes';

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
    type: currentStep && typeMapping[currentStep.type],
  })
);

const selector = createStructuredSelector({
  step: stepSelector,
  isFirstStep: selectors.isFirstOnboardingStepSelector,
});

const actions = {
  onNext: () => (dispatch, getState) => {
    const state = getState();
    const isLast = selectors.isLastOnboardingStepSelector(state);
    const step = stepSelector(state);

    if (step.onNext) {
      dispatch(step.onNext());
    }

    if (isLast) {
      dispatch(onboarding.skipStep());
      return dispatch(router.push(FLAVORPRINT));
    }

    dispatch(onboarding.skipStep());
  },

  onPrevious: onboarding.previousStep,
};

export default connect(selector, actions)(Onboarding);
