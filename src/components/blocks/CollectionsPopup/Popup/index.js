
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';
import partial from 'lodash/partial';

import collection from 'actions/collections';
import recipes from 'actions/recipes';

import Popup from './Popup';

const collectionsSelector = state => state.collections.entries;
const cookbookSelector = (state, props) => get(props.recipe, 'cookbook');
const isAuthenticatedSelector = state => state.user.isAuthenticated;

const popupSelector = createStructuredSelector({
  collections: collectionsSelector,
  cookbook: cookbookSelector,
  isAuthenticated: isAuthenticatedSelector,
});

const actions = (dispatch, props) =>
  bindActionCreators({
    onCreate: data => collection.save(data, 'Popup'),
    onCollectionsUpdate: partial(recipes.updateCollections, props.recipe),
    onDeselect: partial(recipes.deselect, props.recipe),
    onSelect: partial(recipes.select, props.recipe),
  }, dispatch);

export default connect(popupSelector, actions)(Popup);
