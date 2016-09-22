
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { RECIPES_FILTER } from 'constants/QueryParams';

import RecipeSearchField from './RecipeSearchField';

import search from 'actions/search';

const termSelector = state =>
  get(state.router.location.query, RECIPES_FILTER, '');

const recipeSearchSelector = createStructuredSelector({
  term: termSelector,
});

const actions = {
  onTermChange: search.searchTerm,
};

export default connect(recipeSearchSelector, actions)(RecipeSearchField);
