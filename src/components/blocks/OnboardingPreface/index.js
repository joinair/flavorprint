
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import head from 'lodash/head';

import { getRecipeStep, completePercentage } from 'helpers/onboarding';

import {
  BANNER_CLICKED,
  ONBOARDING_VISIBLE,
  ONBOARDING_STEP_ACTION,
} from 'constants/AnalyticsEventTypes';

import config from 'constants/Config';

import onboardingActions from 'actions/onboarding';
import userActions from 'actions/user';

import OnboardingPreface from './OnboardingPreface';

const stepDataSelector = createSelector(
  state => state.preferences.categories,
  categories => head(categories.recipes)
);

const selector = createStructuredSelector({
  stepData: stepDataSelector,
  completePercentage,
});

const notifyContinue = (step, data) => ({
  type: ONBOARDING_STEP_ACTION,
  payload: {
    action: 'CONTINUE',
    data,
    step,
  },
});

const actions = {
  onContinue: () => dispatch => {
    dispatch(onboardingActions.open(config.banner.name));
    dispatch({ type: BANNER_CLICKED });
  },

  onStepComplete: value => (dispatch, getState) => {
    const state = getState();
    const stepData = stepDataSelector(state);
    const step = getRecipeStep(stepData);
    const data = {
      recipes: assign({}, state.user.profile.recipes, {
        [stepData.groupId]: value,
      }),
    };

    dispatch(userActions.updateLocally(data));
    dispatch(onboardingActions.completeStep(step));
    dispatch(onboardingActions.open(config.banner.name));

    dispatch({ type: BANNER_CLICKED });
    dispatch(notifyContinue(step, data));
  },

  onVisible: () => ({
    type: ONBOARDING_VISIBLE,
    payload: { type: config.banner.name },
  }),
};

export default connect(selector, actions)(OnboardingPreface);
