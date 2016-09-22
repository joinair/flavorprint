
import mixpanel from 'analytics/mixpanel';

import size from 'lodash/size';

import {
  getCompletedSteps,
  getRemainingSteps,
} from 'helpers/onboarding';

import { ONBOARDING_VISIBLE } from 'constants/AnalyticsEventTypes';
import { AUTHENTICATION } from 'constants/Onboarding';

import getOrigin from 'analytics/helpers/getOrigin';

const handler = (state, action) => {
  const completed = getCompletedSteps(state);
  const remaining = getRemainingSteps(state);

  if (!state.user.isAuthenticated) {
    remaining.push(AUTHENTICATION);
  }

  mixpanel.register({
    'Number of Onboarding Steps Completed': size(completed),
    'Number of Onboarding Steps Remaining': size(remaining),
    'Onboarding Steps Completed': completed,
    'Onboarding Steps Remaining': remaining,
  });

  mixpanel.track('Onboarding Impression', state, {
    'Page Name': getOrigin(state),
    'Onboarding Variant': action.payload.type,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({
      'Number of Onboarding Steps Completed': size(completed),
      'Number of Onboarding Steps Remaining': size(remaining),
      'Onboarding Steps Completed': completed,
      'Onboarding Steps Remaining': remaining,
    });
  }
};

export default ({ state, action }) => {
  if (action.type === ONBOARDING_VISIBLE) {
    handler(state, action);
  }
};
