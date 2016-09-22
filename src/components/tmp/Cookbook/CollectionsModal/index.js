
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import get from 'lodash/get';
import some from 'lodash/some';
import noop from 'lodash/noop';

import platformPick from 'helpers/platformPick';

import { ALL_RECIPES_COLLECTION, COLLECTION } from 'constants/QueryParams';

import collections from 'actions/collections';

import CollectionsModal from './CollectionsModal';

const isSharedSelector = (state, props) => {
  const username = get(props.route, 'query.username') ||
    get(state.router, 'params.username');

  return username !== get(state.user, 'profile.username');
};

const collectionsSelector = (state, props) =>
  isSharedSelector(state, props)
    ? state.cookbook.collections
    : state.collections;

const firstNameSelector = (state, props) =>
  isSharedSelector(state, props)
    ? state.cookbook.user.profile.firstName
    : state.user.profile.firstName;

const querySelector = (state, props) =>
  get(props, 'route.query') || get(state, 'router.location.query', {});

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

const selector = createStructuredSelector({
  activeCollectionId: activeCollectionIdSelector,
  collections: collectionsSelector,
  firstName: firstNameSelector,
  isShared: isSharedSelector,
});

const onDestroy = props => (id, isActive) => dispatch => {
  const { route, routerActions } = props;

  return dispatch(collections.destroy(id)).subscribe(noop, noop, () => {
    if (isActive) {
      routerActions.replacePreviousAndPop({
        path: `/${route.query.username}`,
        query: {},
      });
    }
  });
};

const onSelect = props => id => {
  const { route, routerActions } = props;

  routerActions.replacePreviousAndPop({
    path: `/${route.query.username}`,
    query: { [COLLECTION]: id },
    toplevel: true,
  });
};

const actions = (dispatch, props) => bindActionCreators({
  onDestroy: onDestroy(props),
  onSave: collections.save,
  onSelect: onSelect(props),
  onClose: platformPick({
    mobile: () => props.routerActions.pop({ toplevel: true }),
    default: props.onClose,
  }),
}, dispatch);

export default connect(selector, actions)(CollectionsModal);
