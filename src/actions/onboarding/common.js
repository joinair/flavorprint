
export const ONBOARDING_SKIP_STEP = 'ONBOARDING_SKIP_STEP';

export const skipStep = () => ({
  type: ONBOARDING_SKIP_STEP,
  payload: {},
});

export const ONBOARDING_PREVIOUS_STEP = 'ONBOARDING_PREVIOUS_STEP';

export const previousStep = () => ({
  type: ONBOARDING_PREVIOUS_STEP,
  payload: {},
});
