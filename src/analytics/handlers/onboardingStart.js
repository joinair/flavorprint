
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';

import { ONBOARDING } from 'constants/Modals';

import getOrigin from 'analytics/helpers/getOrigin';

import { ROUTER_DID_CHANGE } from 'actions/router';

const handler = state => {
  mixpanel.track('Onboarding Started', state, {
    'Page Name': getOrigin(state),
    'Onboarding Variant': state.modal.payload.from,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({
      'Last Onboarding Started': new Date().toISOString(),
    });
  }
};

export default ({ state, action }) => {
  if (
    action.type === ROUTER_DID_CHANGE &&
    action.payload.synthetic &&
    state.modal.type === ONBOARDING &&
    state.modal.payload.from &&
    get(state.router, 'previousState.location.state.modal.type') !== ONBOARDING
  ) {
    handler(state);
  }
};
