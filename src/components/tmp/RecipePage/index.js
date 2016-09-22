
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import get from 'lodash/get';
import map from 'lodash/map';

import { RECIPE_ORIGIN } from 'constants/AnalyticsEventTypes';
import { RECIPE_ACTION, RECIPE_ACTION_SAVE } from 'constants/QueryParams';
import { MOBILE_WEB_VIEW } from 'constants/Routes';

import fetching from 'actions/fetching';
import recipes from 'actions/recipes';
import sharing from 'actions/sharing';

import { platformPickLazy } from 'helpers/platformPick';

import RecipePage from './RecipePage';

const isAuthenticatedSelector = state => state.user.isAuthenticated;

const isFetchingSelector = state => state.fetching[fetching.GROUP_IDS.RECIPE_PAGE];

const recipesSelector = state => state.recipes;

const querySelector = (state, props) => platformPickLazy({
  mobile: () => props.route.query,
  default: () => get(state, 'router.location.query'),
});

const paramsSelector = (state, props) => platformPickLazy({
  mobile: () => props.route.params,
  default: () => get(state, 'router.params'),
});

const recipeSelector = createSelector(
  recipesSelector,
  querySelector,
  paramsSelector,
  ({ entries }, query, params) =>
    (query.url ? entries[query.url] : entries[params.id]) || entries.new
);

const isOwn = createSelector(
  recipeSelector,
  state => state.user,
  (recipe, user) => recipe.userId === user.uid
);

const shouldSelectSelector = createSelector(
  recipeSelector,
  querySelector,
  (recipe, query) =>
    !get(recipe, 'cookbook.saved') &&
      get(query, RECIPE_ACTION) === RECIPE_ACTION_SAVE
);

const shouldOpenPopupSelector = createSelector(
  isAuthenticatedSelector,
  shouldSelectSelector,
  (isAuthenticated, shouldSelect) => isAuthenticated && shouldSelect
);

const alternativeRecipesSelector = createSelector(
  recipeSelector,
  recipesSelector,
  (recipe, allRecipes) => ({
    entries: map(get(recipe, 'alternativeRecipes.entries'), x => allRecipes.entries[x]),
  })
);

const selectorConfig = {
  isOwn,
  isFetching: isFetchingSelector,
  recipe: recipeSelector,
  alternativeRecipes: alternativeRecipesSelector,
  recipes: recipesSelector,
};

const recipePageSelector = createStructuredSelector(
  global.Platform.OS === 'ios' || global.Platform.OS === 'android'
    ? selectorConfig
    : assign({}, selectorConfig, {
      shouldOpenPopup: shouldOpenPopupSelector,
      shouldSelect: shouldSelectSelector,
    })
  );

const actions = (dispatch, props) => bindActionCreators({
  onShare: sharing.share,
  onSelect: recipes.select,
  onReadMethod: url => {
    dispatch({ type: RECIPE_ORIGIN });
    return props.routerActions.push({
      path: MOBILE_WEB_VIEW,
      query: { url },
      toplevel: true,
    });
  },
}, dispatch);

export default connect(recipePageSelector, actions)(RecipePage);
