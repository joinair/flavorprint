
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import without from 'lodash/without';

import { ONBOARDING_STEP_ACTION } from 'constants/AnalyticsEventTypes';
import { INVENTORIES, WELCOME } from 'constants/Onboarding';

import onboarding from 'actions/onboarding';
import router from 'actions/router';
import modalActions from 'actions/modal';
import user from 'actions/user';

import Onboarding from './Onboarding';

const modalSelector = state => state.modal;
const profileSelector = state => state.user.profile;
const preferencesSelector = state => state.preferences.categories;
const isFetchedSelector = state => state.preferences.isFetched;
const isAuthenticatedSelector = state => state.user.isAuthenticated;

const stepsSelector = createSelector(
  modalSelector,
  preferencesSelector,
  (modal, preferences) =>
    isEmpty(preferences.inventories)
      ? without(get(modal, 'payload.steps'), INVENTORIES)
      : get(modal, 'payload.steps')
);

const stepSelector = createSelector(
  modalSelector,
  modal => get(modal, 'payload.step')
);

const updateProfile = (data, withLocal) => (dispatch, getState) => {
  const isAuthenticated = getState().user.isAuthenticated;

  if (isAuthenticated) {
    dispatch(user.update(data));
    if (!withLocal) return;
  }

  dispatch(user.updateLocally(data));
};

const notifyAnalytics = (action, data) => (dispatch, getState) => {
  const step = get(getState().modal, 'payload.step');
  dispatch({
    type: ONBOARDING_STEP_ACTION,
    payload: { action, data, step },
  });
};

const skipStep = step => (dispatch, getState) => {
  const steps = get(getState().modal, 'payload.steps');

  dispatch(notifyAnalytics('SKIP'));
  dispatch(onboarding.openStep(step, steps));
};

const prevStep = () => dispatch => {
  dispatch(notifyAnalytics('BACK'));
  dispatch(router.goBack());
};

const nextStep = (step, data) => (dispatch, getState) => {
  const steps = get(getState().modal, 'payload.steps');

  dispatch(updateProfile(data, true));
  dispatch(notifyAnalytics('CONTINUE', data));
  dispatch(onboarding.openStep(step, steps));
};

const closeQuiz = () => dispatch => {
  dispatch(notifyAnalytics('CLOSE'));
  dispatch(modalActions.fullyClose());
};

const submitQuiz = data => (dispatch, getState) => {
  const steps = get(getState().modal, 'payload.steps');

  dispatch(user.update(data));
  dispatch(onboarding.openStep(WELCOME, steps));
};

const selector = createStructuredSelector({
  preferences: preferencesSelector,
  profile: profileSelector,
  step: stepSelector,
  steps: stepsSelector,
  isAuthenticated: isAuthenticatedSelector,
  isFetched: isFetchedSelector,
});

const actions = {
  onClose: closeQuiz,
  onContinue: nextStep,
  onGoBack: prevStep,
  onSkip: skipStep,
  onQuizSubmit: submitQuiz,
  onWelcomeClose: onboarding.finish,
};

export default connect(selector, actions)(Onboarding);
