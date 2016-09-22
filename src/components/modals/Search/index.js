
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { RECIPES_FILTER } from 'constants/QueryParams';

import Search from './Search';

import search from 'actions/search';

const termSelector = state =>
  get(state.router.location.query, RECIPES_FILTER, '');

const searchSelector = createStructuredSelector({
  term: termSelector,
});

const actions = {
  onTermSearch: term => search.searchTerm(term, 'replace'),
};

export default connect(searchSelector, actions)(Search);
