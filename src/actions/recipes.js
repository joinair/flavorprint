
import assign from 'lodash/assign';
import get from 'lodash/get';
import map from 'lodash/map';
import pick from 'lodash/pick';

import Rx from 'rx';

import { parseFiltersFromQuery } from 'helpers/search';

import { API_CALL } from 'middleware/API';

import {
  LOAD_FEED_REQUEST,
  LOAD_FEED_SUCCESS,
  LOAD_FEED_FAILURE,

  LOAD_NEXT_FEED_PAGE_REQUEST,
  LOAD_NEXT_FEED_PAGE_SUCCESS,
  LOAD_NEXT_FEED_PAGE_FAILURE,

  CONTEXT,
} from './feed';

export const SELECT_RECIPE_REQUEST = 'SELECT_RECIPE_REQUEST';
export const SELECT_RECIPE_SUCCESS = 'SELECT_RECIPE_SUCCESS';
export const SELECT_RECIPE_FAILURE = 'SELECT_RECIPE_FAILURE';

export const DESELECT_RECIPE_REQUEST = 'DESELECT_RECIPE_REQUEST';
export const DESELECT_RECIPE_SUCCESS = 'DESELECT_RECIPE_SUCCESS';
export const DESELECT_RECIPE_FAILURE = 'DESELECT_RECIPE_FAILURE';

export const UPDATE_RECIPE_COLLECTIONS_REQUEST =
  'UPDATE_RECIPE_COLLECTIONS_REQUEST';

export const UPDATE_RECIPE_COLLECTIONS_SUCCESS =
  'UPDATE_RECIPE_COLLECTIONS_SUCCESS';

export const UPDATE_RECIPE_COLLECTIONS_FAILURE =
  'UPDATE_RECIPE_COLLECTIONS_FAILURE';

export const select = data => {
  const endpoint = data.id
    ? `/cookbook/recipes/${data.id}`
    : '/cookbook/recipes';

  const query = assign(
    { cookbook: { saved: true } },
    data.id ? {} : { externalUrl: data.externalUrl }
  );

  return {
    meta: { authenticationRequired: true },
    payload: pick(data, 'externalUrl', 'id', 'tile'),

    [API_CALL]: {
      endpoint,
      method: 'POST',
      query,
      types: [
        SELECT_RECIPE_REQUEST,
        SELECT_RECIPE_SUCCESS,
        SELECT_RECIPE_FAILURE,
      ],
    },
  };
};

export const deselect = data => ({
  meta: {
    authenticationRequired: true,
    previous: {
      cookbook: { collectionIds: get(data, 'cookbook.collectionIds') },
    },
  },

  payload: pick(data, 'externalUrl', 'id', 'tile'),

  [API_CALL]: {
    endpoint: `/cookbook/recipes/${data.id}`,
    method: 'POST',
    query: { cookbook: { saved: false } },
    types: [
      DESELECT_RECIPE_REQUEST,
      DESELECT_RECIPE_SUCCESS,
      DESELECT_RECIPE_FAILURE,
    ],
  },
});

export const updateCollections = (data, collectionIds) => ({
  meta: {
    authenticationRequired: true,
    previous: {
      cookbook: { collectionIds: get(data, 'cookbook.collectionIds') },
    },
  },

  payload: {
    cookbook: { saved: true, collectionIds },
    id: data.id,
    externalUrl: data.externalUrl,
    tile: data.tile,
  },

  [API_CALL]: {
    endpoint: `/cookbook/recipes/${data.id}`,
    method: 'POST',
    query: {
      cookbook: { collectionIds, saved: true },
    },
    types: [
      UPDATE_RECIPE_COLLECTIONS_REQUEST,
      UPDATE_RECIPE_COLLECTIONS_SUCCESS,
      UPDATE_RECIPE_COLLECTIONS_FAILURE,
    ],
  },
});

const shouldReload = (context, state) => {
  if (context !== state.feed.context) {
    return true;
  }

  const prevLocation = get(state.router, 'previousState.location');

  if (!prevLocation) { return true; }

  const nextLocation = state.router.location;

  if (nextLocation.action !== 'POP') { return true; }

  return nextLocation.pathname === prevLocation.pathname;
};

const productsToApi = (products) =>
  map(products, 'canonicalName').join(',');

export const search = (nextPage, defaultQuery) => (dispatch, getState) => {
  if (!nextPage && !shouldReload(CONTEXT.SEARCH, getState())) {
    return Rx.Observable.empty();
  }

  const query = defaultQuery || get(getState(), 'router.location.query');
  const term = get(query, 'term');
  const offset = nextPage
    ? get(getState(), 'feed.paging.offset')
    : 0;

  const { popularProducts, searchPreferences } = getState();
  const filters = parseFiltersFromQuery(
    searchPreferences.categories,
    popularProducts.entries,
    query
  );
  const apiFilters = {
    withProducts: productsToApi(filters.withIngredients),
    dislikedProducts: productsToApi(filters.withoutIngredients),
    allergies: productsToApi(filters.allergies),
    diets: productsToApi(filters.diets),
    mealTypes: productsToApi(filters.mealTypes),
    totalTimeUpTo: filters.time,
  };

  const apiQuery = assign(
    { term, offset, limit: 24, custom: 1 },
    apiFilters
  );

  const types = nextPage
    ? [
      LOAD_NEXT_FEED_PAGE_REQUEST,
      LOAD_NEXT_FEED_PAGE_SUCCESS,
      LOAD_NEXT_FEED_PAGE_FAILURE,
    ] : [
      LOAD_FEED_REQUEST,
      LOAD_FEED_SUCCESS,
      LOAD_FEED_FAILURE,
    ];

  return dispatch({
    payload: { context: CONTEXT.SEARCH },

    [API_CALL]: {
      endpoint: '/recipes/_search',
      query: apiQuery,
      types,
    },
  });
};

export default {
  deselect,
  select,
  updateCollections,

  search,
};
