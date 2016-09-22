
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { platformPickLazy } from 'helpers/platformPick';

import { DELETE_RECIPE } from 'constants/Modals';
import { VIEW_SOURCE, VIEW_FROM_RECIPE_BUILDER } from 'constants/QueryParams';

import fetching from 'actions/fetching';
import { save, uploadImage } from 'actions/recipe';
import { show } from 'actions/notifications';
import modal from 'actions/modal';
import router from 'actions/router';

import RecipeBuilder from './RecipeBuilder';

const recipeIdSelector = (state, props) => platformPickLazy({
  mobile: () => props.route.query.externalUrl || props.route.params.id,
  default: () => get(state, 'router.location.query.externalUrl') ||
    get(state, 'router.params.id'),
});

const isEditingSelector = createSelector(
  recipeIdSelector,
  id => !!id
);

const isFetchingSelector = state =>
  state.fetching[fetching.GROUP_IDS.RECIPE_BUILDER_PAGE];

const recipeSelector = createSelector(
  state => state.recipes,
  recipeIdSelector,
  (recipes, id) => id ? recipes.entries[id] : recipes.entries.new
);

const selector = createStructuredSelector({
  isEditing: isEditingSelector,
  isFetching: isFetchingSelector,
  recipe: recipeSelector,
  isTizenFridge: state => state.tizen.isFridge,
});

const redirectToRecipe = recipe =>
  router.push(`/recipes/${recipe.id}`, {
    [VIEW_SOURCE]: VIEW_FROM_RECIPE_BUILDER,
  });

const actions = {
  onDelete: () => modal.open(DELETE_RECIPE),
  onImageUpload: uploadImage,
  onSave: save,
  onSuccessfulSave: redirectToRecipe,
  showNotification: show,
};

export default connect(selector, actions)(RecipeBuilder);
