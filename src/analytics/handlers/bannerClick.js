
import mixpanel from 'analytics/mixpanel';

import { BANNER_CLICKED } from 'constants/AnalyticsEventTypes';
import config from 'constants/Config';

const handler = state => {
  mixpanel.track('Banner actioned', state, {
    'Banner Variant': config.banner.name,
  });
};

export default ({ state, action }) => {
  if (action.type === BANNER_CLICKED) {
    handler(state);
  }
};
