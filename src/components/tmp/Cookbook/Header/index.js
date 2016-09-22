
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import flowRight from 'lodash/flowRight';

import { COOKBOOK_COLLECTIONS } from 'constants/Modals';
import { ALL_RECIPES_COLLECTION } from 'constants/QueryParams';
import { MOBILE_COLLECTIONS_MODAL } from 'constants/Routes';

import platformPick from 'helpers/platformPick';

import { save, destroy } from 'actions/collections';
import fetching from 'actions/fetching';
import modal from 'actions/modal';
import router from 'actions/router';

import { recipesSelector } from '../Recipes';

import Header from './Header';

const activeCollectionIdSelector = (state, props) => props.activeCollectionId;
const collectionsSelector = (state, props) => props.collections;
const feedSelector = state => state.feed;
const isFetchingSelector = state => state.fetching[fetching.GROUP_IDS.FEED];
const userSelector = (state, props) => props.user;

const isHiddenSlector = createSelector(
  activeCollectionIdSelector,
  feedSelector,
  isFetchingSelector,

  (activeCollectionId, feed, isFetching) =>
    Boolean(
      (activeCollectionId === ALL_RECIPES_COLLECTION || isFetching) &&
      !feed.paging.total
    )
);

const headerSelector = createStructuredSelector({
  recipes: recipesSelector,
  key: activeCollectionIdSelector,
  collectionId: activeCollectionIdSelector,
  collections: collectionsSelector,
  isHidden: isHiddenSlector,
  isFetching: isFetchingSelector,
  user: userSelector,
});

const actions = (dispatch, props) => {
  const onCollectionSelect = platformPick({
    mobile: () => {},
    default: () => dispatch(modal.open(COOKBOOK_COLLECTIONS)),
  });

  const onDestroy = id => {
    dispatch(destroy(id));
    dispatch(router.push());
  };

  const onSave = flowRight(dispatch, save);

  const onOpenCollectionsModal = platformPick({
    mobile: () => props.routerActions.push({
      path: MOBILE_COLLECTIONS_MODAL,
      toplevel: true,
      query: assign({}, props.route.query, props.route.params),
    }),
    default: () => {},
  });

  return {
    onCollectionSelect,
    onOpenCollectionsModal,
    onDestroy,
    onSave,
  };
};

export default connect(headerSelector, actions)(Header);
