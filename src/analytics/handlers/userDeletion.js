
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';

import { DESTROY_USER_REQUEST } from 'actions/user';

const handler = (state, action) => {
  mixpanel.track('Delete User', state, {
    Comment: get(action, 'meta.comment'),
    Reason: get(action, 'meta.reason'),
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ $unsubscribed: true });
  }
};

export default ({ state, action }) => {
  if (action.type === DESTROY_USER_REQUEST) {
    handler(state, action);
  }
};
