
import assign from 'lodash/assign';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import { setDate, getRemainingSteps } from 'helpers/onboarding';

import { ONBOARDING } from 'constants/Modals';
import { RECIPE_FEED } from 'constants/Routes';
import { AUTHENTICATION, WELCOME } from 'constants/Onboarding';

import modal from './modal';
import router from './router';

const openStep = (step, steps, from) => (dispatch, getState) => {
  const { isAuthenticated, uid } = getState().user;

  if (isAuthenticated) { setDate(uid); }

  return dispatch(
    modal.open(
      ONBOARDING,
      { step, steps, from },
      step === WELCOME
        ? { dimmer: { hidden: true } }
        : { dimmer: { disabled: true } }
    )
  );
};

export const open = from => (dispatch, getState) => {
  const steps = getRemainingSteps(getState());
  const step = isEmpty(steps) ? AUTHENTICATION : head(steps);

  return dispatch(openStep(step, steps, from));
};

export const COMPLETE_STEP = 'COMPLETE_STEP';

export const completeStep = step => ({
  type: COMPLETE_STEP,
  payload: {
    step,
  },
});

export const finish = () => (dispatch, getState) => {
  const { query, state } = getState().router;
  const { isAuthenticated, uid } = getState().user;

  if (isAuthenticated) { setDate(uid); }

  dispatch(
    router.replace(
      RECIPE_FEED,
      query,
      assign({ forceReload: ONBOARDING }, omit(state, 'modal'))
    )
  );
};

export default {
  completeStep,
  open,
  openStep,
  finish,
};
