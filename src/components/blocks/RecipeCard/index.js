
import { connect } from 'react-redux';
import { likeRecipe, dislikeRecipe } from 'actions/recipe';

import RecipeCard from './RecipeCard';

const actions = {
  onLike: likeRecipe,
  onDislike: dislikeRecipe,
};

export default connect(null, actions)(RecipeCard);
