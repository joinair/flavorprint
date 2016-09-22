
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { RECIPES_FILTER } from 'constants/QueryParams';
import { SEARCH_FILTERS } from 'constants/Modals';
import { MOBILE_FILTERS } from 'constants/Routes';

import SearchResults from './SearchResults';

import fetching from 'actions/fetching';
import modal from 'actions/modal';
import search from 'actions/search';
import feed from 'actions/feed';

import { parseFiltersFromQuery } from 'helpers/search';
import platformPick from 'helpers/platformPick';

const isFetchingSelector = state =>
  state.fetching[fetching.GROUP_IDS.SEARCH_RESULTS_PAGE];

const numberOfResultsSelector = state =>
  state.feed.paging.total | 0;

const termSelector = platformPick({
  default: state => get(state.router.location.query, RECIPES_FILTER, ''),
  mobile: (_, props) => get(props, 'route.query.term', ''),
});

const preferencesSelector = state =>
  state.searchPreferences.categories;

const facetsHitsSelector = state =>
  state.feed.facetsHits;

const filtersSelector = platformPick({
  default: state => {
    const { query } = state.router.location;
    const { popularProducts, searchPreferences } = state;
    return parseFiltersFromQuery(searchPreferences.categories, popularProducts.entries, query);
  },

  mobile: (state, props) => {
    const { query } = props.route;
    const { popularProducts, searchPreferences } = state;
    return parseFiltersFromQuery(searchPreferences.categories, popularProducts.entries, query);
  },
});

const productsSelector = state =>
  state.popularProducts.entries;

const searchResultsSelector = createStructuredSelector({
  isFetching: isFetchingSelector,
  numberOfResults: numberOfResultsSelector,
  term: termSelector,
  prefCategories: preferencesSelector,
  products: productsSelector,
  filters: filtersSelector,
  facetsHits: facetsHitsSelector,
});

// Actions

const openFiltersModal = () => modal.open(SEARCH_FILTERS);

const actions = platformPick({
  mobile: (outerDispatch, props) => ({
    onTermSearch: term => dispatch => {
      dispatch(feed.clean());
      dispatch(
        search.searchTerm(
          props.route,
          props.routerActions,
          term
        )
      );
    },

    onFiltersOpen: () => props.routerActions.push(MOBILE_FILTERS, props.route.query),
  }),

  default: {
    onTermSearch: term => search.searchTerm(term),
    onFiltersApply: filters => search.applyFilters(filters),
    onFiltersReset: () => search.resetFilters(),
    onFiltersOpen: openFiltersModal,
  },
});

export default connect(searchResultsSelector, actions)(SearchResults);
