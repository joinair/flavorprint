
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';

import { MOBILE_FILTERS } from 'constants/Routes';

import { convertFiltersToQuery, parseFiltersFromQuery } from 'helpers/search';

import SearchFiltersIngredients from './SearchFiltersIngredients';

const productsSelector = state => state.popularProducts.entries;

const filtersSelector = (state, props) => {
  const { query } = props.route;
  const { popularProducts, searchPreferences } = state;
  return parseFiltersFromQuery(
    searchPreferences.categories, popularProducts.entries, query);
};

const ingredientsSelector = (state, props) =>
  filtersSelector(state, props)[props.route.state.field];

const styleSelector = (state, props) =>
  props.route.state.field === 'withIngredients' ? 'broccoli' : 'paprika';

const titleSelector = (state, props) =>
  props.route.state.field === 'withIngredients' ? 'With ingredients' : 'Without ingredients';

const selector = createStructuredSelector({
  products: productsSelector,
  ingredients: ingredientsSelector,
  style: styleSelector,
  title: titleSelector,
});

const actions = (dispatch, props) => bindActionCreators({
  onSet: value => (innerDispatch, getState) => {
    const filters = filtersSelector(getState(), props);
    const newFilters = assign({}, filters, {
      [props.route.state.field]: value,
    });

    const query = convertFiltersToQuery(newFilters);

    return props.routerActions.replacePreviousAndPop({
      path: MOBILE_FILTERS,
      query,
    });
  },
}, dispatch);

export default connect(selector, actions)(SearchFiltersIngredients);
