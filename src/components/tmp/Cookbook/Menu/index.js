
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { COLLECTION, ALL_RECIPES_COLLECTION } from 'constants/QueryParams';

import { save } from 'actions/collections';
import router from 'actions/router';

import Menu from './Menu';

const activeCollectionSelector = (state, props) => props.activeCollectionId;
const collectionsSelector = (state, props) => props.collections;
const totalCountSelector = (state, props) => props.totalRecipeCount;

const menuSelector = createStructuredSelector({
  totalCount: totalCountSelector,
  collections: collectionsSelector,
  active: activeCollectionSelector,
});

const actions = dispatch => {
  const onCollectionSelect = id => {
    const query = id === ALL_RECIPES_COLLECTION
      ? {}
      : { [COLLECTION]: id };

    dispatch(router.push(null, query));
  };

  return bindActionCreators(
    { onCollectionSelect, onCreate: save },
    dispatch
  );
};

export default connect(menuSelector, actions)(Menu);
