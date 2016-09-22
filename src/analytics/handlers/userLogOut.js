
import mixpanel from 'analytics/mixpanel';

import uuid from 'uuid';

import { LOG_OUT } from 'actions/user';

const handler = state => {
  mixpanel.track('Log Out', state);
  mixpanel.reset();
  mixpanel.identify(uuid.v4());
};

export default ({ state, action }) => {
  if (action.type === LOG_OUT) {
    handler(state);
  }
};
