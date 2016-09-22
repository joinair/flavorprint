
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import get from 'lodash/get';
import some from 'lodash/some';

import platformPick from 'helpers/platformPick';

import { ALL_RECIPES_COLLECTION, COLLECTION } from 'constants/QueryParams';

import CookbookCollections from './CookbookCollections';

import collections from 'actions/collections';
import router from 'actions/router';

const isSharedSelector = (state, props) =>
  get(state.router, 'params.username', (
    get(props.route, 'query.username')
  )) !== get(state.user, 'profile.username');

const collectionsSelector = (state, props) =>
  isSharedSelector(state, props)
    ? state.cookbook.collections
    : state.collections;

const firstNameSelector = (state, props) =>
  isSharedSelector(state, props)
    ? state.cookbook.user.profile.firstName
    : state.user.profile.firstName;

const querySelector = (state, props) =>
  get(state, 'router.location.query', (
    get(props, 'route.query', {})
  ));

const activeCollectionIdSelector = createSelector(
  collectionsSelector,
  querySelector,

  ({ entries }, query) => {
    const collectionId = get(query, COLLECTION);

    const collectionIsFound = collectionId && (
      collectionId === ALL_RECIPES_COLLECTION ||
      some(entries, ({ id }) => id === collectionId)
    );

    if (collectionIsFound) {
      return collectionId;
    }

    return ALL_RECIPES_COLLECTION;
  }
);

const cookbookCollectionsSelector = createStructuredSelector({
  activeCollectionId: activeCollectionIdSelector,
  collections: collectionsSelector,
  firstName: firstNameSelector,
  isShared: isSharedSelector,
});

const onDestroy = (id, isActive) => dispatch => {
  dispatch(collections.destroy(id));

  if (isActive) {
    dispatch(router.push());
  }
};

const onSelect = id => dispatch => {
  const query = id === ALL_RECIPES_COLLECTION
      ? {}
      : { [COLLECTION]: id };

  dispatch(router.replace(null, query));
};

const onSelectMobile = props => id => {
  const { route, routerActions } = props;

  routerActions.replacePreviousAndPop({
    path: `/${route.query.username}`,
    query: { [COLLECTION]: id },
  });
};

const actions = (dispatch, props) => bindActionCreators({
  onDestroy,
  onSave: collections.save,

  onSelect: platformPick({
    mobile: onSelectMobile(props),
    default: onSelect,
  }),

  onClose: platformPick({
    mobile: () => props.routerActions.pop(),
    default: props.onClose,
  }),
}, dispatch);

export default connect(cookbookCollectionsSelector, actions)(CookbookCollections);
