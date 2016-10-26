
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectRecipe,
  skipStep,
} from 'actions/onboarding';

import selectors from 'reducers/selectors';

import OnboardingRecipesStep from './OnboardingRecipesStep';

const selector = createStructuredSelector({
  selectedRecipes: selectors.onboardingSelectedRecipesSelector,
});

const actions = {
  onSelectRecipe: (sourceId, deselect) => dispatch => {
    dispatch(selectRecipe(sourceId, deselect));
    dispatch(skipStep());
  },
};

export default connect(selector, actions)(OnboardingRecipesStep);
