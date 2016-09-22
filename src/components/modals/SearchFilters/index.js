
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import get from 'lodash/get';

import SearchFilters from './SearchFilters';

import { MOBILE_SEARCH_FILTERS_INGREDIENTS } from 'constants/Routes';

import { parseFiltersFromQuery, convertFiltersToQuery } from 'helpers/search';
import platformPick from 'helpers/platformPick';

import search from 'actions/search';

// Props

const preferencesSelector = state =>
  state.searchPreferences.categories;

const facetsHitsSelector = state =>
  state.feed.facetsHits;

const filtersSelector = (state, props) => {
  const query = get(props, 'route.query') || get(state, 'router.location.query');
  const { popularProducts, searchPreferences } = state;
  return parseFiltersFromQuery(searchPreferences.categories, popularProducts.entries, query);
};

const productsSelector = state =>
  state.popularProducts.entries;

const structuredSelector = createStructuredSelector({
  prefCategories: preferencesSelector,
  products: productsSelector,
  filters: filtersSelector,
  facetsHits: facetsHitsSelector,
});

// Actions

const actions = (dispatch, props) => bindActionCreators(platformPick({
  mobile: {
    onFiltersApply: filters =>
      search.applyFilters(props.route, props.routerActions, filters, 'replacePreviousAndPop'),
    onFiltersReset: () =>
      search.resetFilters(props.route, props.routerActions, 'replacePreviousAndPop'),
    onIngredientsChoose: (filters, field) =>
      props.routerActions.push({
        path: MOBILE_SEARCH_FILTERS_INGREDIENTS,
        query: convertFiltersToQuery(filters),
        state: { field },
      }),
  },

  default: {
    onFiltersApply: filters => search.applyFilters(filters, 'replace'),
    onFiltersReset: () => search.resetFilters('replace'),
  },
}), dispatch);

export default connect(structuredSelector, actions)(SearchFilters);
