
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { VIEW_FROM_RELATED_RECIPES } from 'constants/QueryParams';

import RecipeCard from './RecipeCard';

const viewSourceSelector = (state, props) =>
  props.alternative
    ? VIEW_FROM_RELATED_RECIPES
    : get(state, 'router.tag');

const uidSelector = state => state.user.uid;

const propsSelector = createStructuredSelector({
  viewSource: viewSourceSelector,
  uid: uidSelector,
});

export default connect(propsSelector)(RecipeCard);
