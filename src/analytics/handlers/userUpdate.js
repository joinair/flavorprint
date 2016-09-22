
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';

import { UPDATE_USER_SUCCESS } from 'actions/user';

const handler = (state, previousState) => {
  const shouldChangeSubscription = state.user.isAuthenticated && (
    get(state.user, 'profile.receiveNotifications') !==
    get(previousState, 'user.profile.receiveNotifications')
  );

  if (shouldChangeSubscription) {
    mixpanel.people.set({
      $unsubscribed: !state.user.profile.receiveNotifications,
    });
  }
};

export default ({ state, action, previousState }) => {
  if (action.type === UPDATE_USER_SUCCESS) {
    handler(state, previousState);
  }
};
