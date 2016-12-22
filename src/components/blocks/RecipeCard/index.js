
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectors from 'reducers/selectors';
import { likeRecipe, dislikeRecipe } from 'actions/recipe';

import RecipeCard from './RecipeCard';

const selector = createStructuredSelector({
  shouldShowScore: selectors.shouldShowScore,
});

const actions = {
  onLike: likeRecipe,
  onDislike: dislikeRecipe,
};

export default connect(selector, actions)(RecipeCard);
