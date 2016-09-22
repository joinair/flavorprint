
import assign from 'lodash/assign';
import get from 'lodash/get';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import noop from 'lodash/noop';
import omitBy from 'lodash/omitBy';

import Rx from 'rx';

import { HOME, SEARCH_RESULTS } from 'constants/Routes';
import {
  RECIPES_FILTER,
  APPLY_FILTERS,
  FILTERS_DIETS,
  FILTERS_ALLERGIES,
} from 'constants/QueryParams';

import collections from 'actions/collections';
import fetching from 'actions/fetching';
import preferences from 'actions/preferences';
import recipes from 'actions/recipes';
import { CONTEXT } from 'actions/feed';

import initialLoad from 'helpers/initialLoad';
import { platformPickLazy } from 'helpers/platformPick';

import SearchResults from 'components/pages/SearchResults';

const generateDefaultFilters = (term, profile) => {
  const query = {
    [RECIPES_FILTER]: term,
  };

  if (profile) {
    const allergies = get(profile, 'allergies', []);

    return omitBy(assign(query, {
      [FILTERS_DIETS]: get(profile.diet, 'text', ''),
      [FILTERS_ALLERGIES]: map(allergies, 'text').join(','),
    }), isEmpty);
  }

  return query;
};

export default store => ({
  path: SEARCH_RESULTS,
  component: SearchResults,
  analyticsTag: 'Search Results',

  prepareData({ query }) {
    if (!initialLoad() && !query.applyFilters) {
      if (global.Platform.OS === 'browser') {
        store.dispatch(fetching.start(fetching.GROUP_IDS.SEARCH_RESULTS_PAGE));
      }

      const state = store.getState();

      const observables = platformPickLazy({
        mobile: () => {
          if (state.feed.context !== CONTEXT.SEARCH) {
            return [store.dispatch(recipes.search(null, query))];
          }
          return [];
        },

        default: () => [store.dispatch(recipes.search(null, query))],
      });

      const { user } = state;

      if (global.Platform.OS === 'browser') {
        const onComplete = () =>
          store.dispatch(fetching.stop(fetching.GROUP_IDS.SEARCH_RESULTS_PAGE));

        Rx.Observable.from(observables).flatMap(identity)
          .subscribe(noop, onComplete, onComplete);
      }

      if (user.isAuthenticated && !state.collections.isFetched) {
        observables.push(store.dispatch(collections.load()));
      }

      return Rx.Observable.from(observables).flatMap(identity);
    }
  },

  onEnter(nextState, replace, callback) {
    const { query } = nextState.location;
    const term = get(query, RECIPES_FILTER);

    const onDefault = () => {
      replace({ pathname: HOME });
      callback();
    };

    const onSuccess = () => {
      const applyFilters = get(query, APPLY_FILTERS);
      if (applyFilters) {
        const profile = get(store.getState(), 'user.profile');
        const defaultFilters = generateDefaultFilters(term, profile);
        replace({
          pathname: SEARCH_RESULTS,
          query: defaultFilters,
        });
      }
      callback();
    };

    store
      .dispatch(preferences.load())
      .subscribe(noop, onDefault, onSuccess);
  },
});
