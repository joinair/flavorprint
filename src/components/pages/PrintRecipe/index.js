
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { RECIPE_ID, RECIPE_URL } from 'constants/QueryParams';

import PrintRecipe from './PrintRecipe';

const recipeSelector = createSelector(
  state => state.recipes.entries,
  state => get(state, 'router.location.query'),
  (entries, query) => {
    const id = get(query, RECIPE_ID);
    const url = get(query, RECIPE_URL);

    return (id ? entries[id] : entries[url]) || entries.new;
  }
);

const selector = createStructuredSelector({
  recipe: recipeSelector,
});

export default connect(selector)(PrintRecipe);
