
import identity from 'lodash/identity';
import noop from 'lodash/noop';

import Rx from 'rx';

import { API_CALL } from 'middleware/API';

export const LOAD_PREFERENCES_REQUEST = 'LOAD_PREFERENCES_REQUEST';
export const LOAD_PREFERENCES_SUCCESS = 'LOAD_PREFERENCES_SUCCESS';
export const LOAD_PREFERENCES_FAILURE = 'LOAD_PREFERENCES_FAILURE';

export const LOAD_SEARCH_PREFERENCES_REQUEST = 'LOAD_SEARCH_PREFERENCES_REQUEST';
export const LOAD_SEARCH_PREFERENCES_SUCCESS = 'LOAD_SEARCH_PREFERENCES_SUCCESS';
export const LOAD_SEARCH_PREFERENCES_FAILURE = 'LOAD_SEARCH_PREFERENCES_FAILURE';

export const LOAD_POPULAR_PRODUCTS_REQUEST = 'LOAD_POPULAR_PRODUCTS_REQUEST';
export const LOAD_POPULAR_PRODUCTS_SUCCESS = 'LOAD_POPULAR_PRODUCTS_SUCCESS';
export const LOAD_POPULAR_PRODUCTS_FAILURE = 'LOAD_POPULAR_PRODUCTS_FAILURE';

const loadConfiguration = () => ({
  [API_CALL]: {
    endpoint: '/preferences',
    types: [
      LOAD_PREFERENCES_REQUEST,
      LOAD_PREFERENCES_SUCCESS,
      LOAD_PREFERENCES_FAILURE,
    ],
  },
});

const loadSearchPreferences = () => ({
  [API_CALL]: {
    endpoint: '/preferences/search',
    types: [
      LOAD_SEARCH_PREFERENCES_REQUEST,
      LOAD_SEARCH_PREFERENCES_SUCCESS,
      LOAD_SEARCH_PREFERENCES_FAILURE,
    ],
  },
});

export const loadPopularProducts = () => ({
  [API_CALL]: {
    endpoint: '/preferences/dislikedProducts',
    query: { term: '' },
    types: [
      LOAD_POPULAR_PRODUCTS_REQUEST,
      LOAD_POPULAR_PRODUCTS_SUCCESS,
      LOAD_POPULAR_PRODUCTS_FAILURE,
    ],
  },
});

export const load = () => (dispatch, getState) => {
  const state = getState();
  const observables = [];

  if (!state.preferences.isFetched) {
    observables.push(dispatch(loadConfiguration()));
  }

  if (!state.popularProducts.isFetched) {
    observables.push(dispatch(loadPopularProducts()));
  }

  if (!state.searchPreferences.isFetched) {
    observables.push(dispatch(loadSearchPreferences()));
  }

  const fetchers$ = Rx.Observable.fromArray(observables).flatMap(identity);

  fetchers$.subscribe(noop, noop);

  return fetchers$;
};

export default { load };
