
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';
import some from 'lodash/some';

import { SEARCH_RESULTS } from 'constants/Routes';
import { POPULAR } from 'constants/SearchPredefinedTerms';

import {
  APPLY_FILTERS,

  FILTERS_WITH_INGRIDIENTS,
  FILTERS_WITHOUT_INGRIDIENTS,
  FILTERS_DIETS,
  FILTERS_ALLERGIES,
  FILTERS_TIME,
  FILTERS_MEAL_TYPES,

  RECIPES_FILTER,
} from 'constants/QueryParams';

import { ROUTER_DID_CHANGE } from 'actions/router';

import { platformPickLazy } from 'helpers/platformPick';

import getOrigin from 'analytics/helpers/getOrigin';

const track = (state, category, term) => {
  const datetime = new Date().toISOString();
  const origin = getOrigin(state);
  const query = state.router.location.query;

  const filters = [];

  if (query[FILTERS_WITH_INGRIDIENTS]) {
    filters.push('WITH_INGRIDIENTS');
  }

  if (query[FILTERS_WITHOUT_INGRIDIENTS]) {
    filters.push('WITHOUT_INGRIDIENTS');
  }

  if (query[FILTERS_DIETS]) {
    filters.push('DIETS');
  }

  if (query[FILTERS_ALLERGIES]) {
    filters.push('ALLERGIES');
  }

  if (query[FILTERS_TIME]) {
    filters.push('TIME');
  }

  if (query[FILTERS_MEAL_TYPES]) {
    filters.push('MEAL_TYPES');
  }

  mixpanel.register({
    'Date of Last Search': datetime,
    'Total Searches': platformPickLazy({
      mobile: () => undefined,
      default: () =>
        (mixpanel.getProperty('Total Searches') | 0) + 1,
    }),
  });

  mixpanel.track('Search Recipe', state, {
    Keyword: term.toLowerCase(),
    'Search Filters': filters,
    'Search Input Type': category,
    'Searched From': origin,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Date of Last Search': datetime });
    mixpanel.people.increment('Total Searches');
  }
};

const handler = state => {
  const { location } = state.router;
  const term = get(location.query, RECIPES_FILTER);

  if (term) {
    const isPopular = some(POPULAR, { term });
    const category = isPopular ? 'Popular' : 'Manual';
    track(state, category, term);
  }
};

export default ({ state, action }) => {
  if (
    action.type === ROUTER_DID_CHANGE &&
    !action.payload.synthetic &&
    state.router.location.pathname === SEARCH_RESULTS &&
    !state.router.location.query[APPLY_FILTERS]
  ) {
    handler(state);
  }
};
