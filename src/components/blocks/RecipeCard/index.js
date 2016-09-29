
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { likeRecipe, dislikeRecipe } from 'actions/recipe';
import selectors from 'reducers/selectors';

import { VIEW_FROM_RELATED_RECIPES } from 'constants/QueryParams';

import RecipeCard from './RecipeCard';

const viewSourceSelector = (state, props) =>
  props.alternative
    ? VIEW_FROM_RELATED_RECIPES
    : get(state, 'router.tag');

const propsSelector = createStructuredSelector({
  viewSource: viewSourceSelector,
  uid: selectors.userIdSelector,
});

const actions = {
  onLike: likeRecipe,
  onDislike: dislikeRecipe,
};

export default connect(propsSelector, actions)(RecipeCard);
