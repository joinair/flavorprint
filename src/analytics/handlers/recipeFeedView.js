
import mixpanel from 'analytics/mixpanel';

import filter from 'lodash/filter';
import map from 'lodash/map';

import { RECIPE_FEED_VIEW } from 'constants/AnalyticsEventTypes';
import config from 'constants/Config';

import {
  LIMIT,

  LOAD_FEED_SUCCESS,
  LOAD_NEXT_FEED_PAGE_SUCCESS,
} from 'actions/feed';

import getOrigin from 'analytics/helpers/getOrigin';
import loadedFrom from 'analytics/helpers/loadedFrom';

const handler = state => {
  const { feed } = state;
  const { paging, recipes } = feed;
  const { offset } = paging;

  const pageNumber = Math.ceil(offset / LIMIT);

  const latest = recipes.slice((pageNumber - 1) * LIMIT);

  const recommendations = filter(map(latest, 'tile'));
  const coverage = recommendations.length / latest.length;

  mixpanel.track('View Recipe Feed', state, {
    'Banner Variant': state.user.isAuthenticated ? undefined : config.banner.name,
    'Loaded From': loadedFrom(state),
    'Onboarding Visible': !state.user.isAuthenticated,
    'Page Number': pageNumber,
    'Recommendations Coverage': coverage,
    'Recommendations Loaded': recommendations,
  });
};

export default ({ state, action }) => {
  if (
    action.type === RECIPE_FEED_VIEW || (
      getOrigin(state) === 'Recipe feed' && (
        action.type === LOAD_FEED_SUCCESS ||
        action.type === LOAD_NEXT_FEED_PAGE_SUCCESS
      )
    )
  ) {
    handler(state);
  }
};
