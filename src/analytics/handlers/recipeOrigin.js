
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';

import { RECIPE_ORIGIN } from 'constants/AnalyticsEventTypes';

import loadedFrom from 'analytics/helpers/loadedFrom';

const handler = state => {
  const { location } = state.router;
  const { url } = location.query || {};

  const recipe = state.recipes.entries[url];

  mixpanel.track('Navigate External Recipe Url', state, {
    'Loaded From': loadedFrom(state),
    'Recipe Id': get(recipe, 'id'),
    'Recipe Url': get(recipe, 'externalUrl'),
    'Recipe Publisher': get(recipe, 'data.publisher.name', 'whisk.com'),
  });
};

export default ({ state, action }) => {
  if (action.type === RECIPE_ORIGIN) {
    handler(state);
  }
};
