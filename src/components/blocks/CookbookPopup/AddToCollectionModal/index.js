
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector, createSelector } from 'reselect';

import get from 'lodash/get';
import partial from 'lodash/partial';

import collection from 'actions/collections';
import recipes from 'actions/recipes';

import AddToCollectionModal from './AddToCollectionModal';

const collectionsSelector = state => state.collections.entries;
const isAuthenticatedSelector = state => state.user.isAuthenticated;

const recipeSelector = (state, { recipe }) => {
  const fromProps = recipe;
  const fromReducer = recipe && state.recipes.entries[recipe.externalUrl || recipe.id];

  return get(fromReducer, 'cookbook') && fromReducer || fromProps;
};

const cookbookSelector = createSelector(
  recipeSelector,
  (recipe) => get(recipe, 'cookbook', {})
);

const popupSelector = createStructuredSelector({
  collections: collectionsSelector,
  recipe: recipeSelector,
  cookbook: cookbookSelector,
  isAuthenticated: isAuthenticatedSelector,
});

const actions = (dispatch, props) =>
  bindActionCreators({
    onCreate: data => collection.save(data, 'Popup'),
    onCollectionsUpdate: recipes.updateCollections,
    onDeselect: partial(recipes.deselect, props.recipe),
    onSelect: partial(recipes.select, props.recipe),
  }, dispatch);

export default connect(popupSelector, actions)(AddToCollectionModal);
