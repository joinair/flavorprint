
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';
import find from 'lodash/find';
import size from 'lodash/size';

import { COOKBOOK_VIEW } from 'constants/AnalyticsEventTypes';
import { COLLECTION } from 'constants/QueryParams';

import getOrigin from 'analytics/helpers/getOrigin';

const handler = state => {
  const datetime = new Date().toISOString();
  const origin = getOrigin(state);
  const isShared = origin !== 'Cookbook';

  const collections = isShared
    ? state.cookbook.collections
    : state.collections;

  const numberOfCollections = size(collections.entries);
  const totalNumberOfRecipes = collections.numRecipes;

  const { location } = state.router;
  const collectionId = get(location.query, COLLECTION);
  const collection = find(collections.entries, { id: collectionId });

  mixpanel.register({
    'Date of Last Cookbook View': datetime,
  });

  mixpanel.track('View Cookbook', state, {
    'Cookbook User': isShared ? state.cookbook.user.profile.username : undefined,
    'Number of Collections': numberOfCollections,
    'Number of Recipes': get(collection, 'numRecipes'),
    'Selected Collection': get(collection, 'name'),
    'Total Number of Recipes': totalNumberOfRecipes,
  });

  if (state.user.isAuthenticated && !isShared) {
    mixpanel.people.set({
      'Date of Last Cookbook View': datetime,
      'Number of Collections': numberOfCollections,
      'Total Number of Recipes': totalNumberOfRecipes,
    });

    mixpanel.people.increment('Number of Cookbook Viewed');
  }
};

export default ({ state, action }) => {
  if (action.type === COOKBOOK_VIEW) {
    handler(state);
  }
};
