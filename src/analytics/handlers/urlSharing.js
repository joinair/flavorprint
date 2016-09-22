
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';

import { URL_SHARING } from 'constants/AnalyticsEventTypes';

import getOrigin from 'analytics/helpers/getOrigin';
import loadedFrom from 'analytics/helpers/loadedFrom';

const trackCookbookShare = (state, action) => {
  const datetime = new Date().toISOString();
  const { params } = state.router;

  mixpanel.register({
    'Date of Last Cookbook Shared': datetime,
  });

  mixpanel.track('Share Cookbook', state, {
    'Cookbook User': get(params, 'username'),
    'Sharing Service': action.payload.service,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({
      'Date of Last Cookbook Shared': datetime,
    });

    mixpanel.people.increment('Total Cookbooks Shared');
  }
};

const trackRecipeShare = (state, action) => {
  const datetime = new Date().toISOString();
  const { location, params } = state.router;
  const { id } = params || {};
  const { url } = location.query || {};

  const recipe = state.recipes.entries[url || id];

  mixpanel.register({
    'Date of Last Recipe Shared': datetime,
  });

  mixpanel.track('Share Recipe', state, {
    'Loaded From': loadedFrom(state),
    'Recipe Id': get(recipe, 'id'),
    'Recipe Url': get(recipe, 'externalUrl'),
    'Recipe Publisher': get(recipe, 'data.publisher.name', 'whisk.com'),
    'Sharing Service': action.payload.service,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({
      'Date of Last Recipe Shared': datetime,
    });

    mixpanel.people.increment('Total Recipes Shared');
  }
};

const handler = (state, action) => {
  const origin = getOrigin(state);

  if (origin === 'Recipe view') {
    trackRecipeShare(state, action);
  } else {
    trackCookbookShare(state, action);
  }
};

export default ({ state, action }) => {
  if (action.type === URL_SHARING) {
    handler(state, action);
  }
};
