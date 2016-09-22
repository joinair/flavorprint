
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import get from 'lodash/get';
import some from 'lodash/some';

import { COLLECTION, ALL_RECIPES_COLLECTION } from 'constants/QueryParams';

import fetching from 'actions/fetching';
import sharing from 'actions/sharing';

import Cookbook from './Cookbook';

const usernameSelector = (state, props) =>
  get(props, 'route.params.username') ||
    get(state.router, 'params.username');

const isShared = (state, props) =>
  usernameSelector(state, props) !==
    get(state.user, 'profile.username');

const collectionsSelector = (state, props) =>
  isShared(state, props)
    ? state.cookbook.collections.entries
    : state.collections.entries;

const userSelector = (state, props) =>
  isShared(state, props)
    ? state.cookbook.user
    : state.user;

const querySelector = (state, props) =>
  get(props, 'route.query') || get(state, 'router.location.query', {});

const totalRecipeCountSelector = (state, props) =>
  isShared(state, props)
    ? state.cookbook.collections.numRecipes
    : state.collections.numRecipes;

const isFetchingSelector = state =>
  state.fetching[fetching.GROUP_IDS.COOKBOOK_PAGE];

const activeCollectionSelector = createSelector(
  collectionsSelector,
  querySelector,

  (collections, query) => {
    const collection = get(query, COLLECTION);

    const collectionIsFound = collection && (
      collection === ALL_RECIPES_COLLECTION ||
      some(collections, ({ id }) => id === collection)
    );

    if (collectionIsFound) {
      return collection;
    }

    return ALL_RECIPES_COLLECTION;
  }
);

const cookbookSelector = createStructuredSelector({
  isShared,
  isFetching: isFetchingSelector,

  activeCollectionId: activeCollectionSelector,
  collections: collectionsSelector,
  totalRecipeCount: totalRecipeCountSelector,
  user: userSelector,
});

const actions = {
  onShare: sharing.share,
};

export default connect(cookbookSelector, actions)(Cookbook);
