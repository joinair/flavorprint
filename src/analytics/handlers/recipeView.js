
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';

import { RECIPE_VIEW } from 'constants/AnalyticsEventTypes';

import { LOAD_RECIPE_SUCCESS } from 'actions/recipe';

import getOrigin from 'analytics/helpers/getOrigin';
import loadedFrom from 'analytics/helpers/loadedFrom';

const handler = state => {
  const { location, params } = state.router;
  let { id } = params || {};
  const { url } = location.query || {};
  const recommendation = get(state.router, 'location.query.recommendation');
  const isNewTab = !get(state.router, 'previousState.location');

  if (!id) {
    id = get(state.recipes.entries[url], 'id');
  }

  mixpanel.track('View Recipe', state, {
    'Loaded From': loadedFrom(state),
    'New Tab': isNewTab,
    'Recipe Id': id,
    'Recipe Url': url,
    'Recommendation Type': recommendation,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.union('Recipes Viewed', url || id);
    mixpanel.people.increment('Total Recipes Viewed');
  }
};

export default ({ state, action }) => {
  if (action.type === RECIPE_VIEW || (
    getOrigin(state) === 'Recipe view' &&
    action.type === LOAD_RECIPE_SUCCESS
  )) {
    handler(state);
  }
};
