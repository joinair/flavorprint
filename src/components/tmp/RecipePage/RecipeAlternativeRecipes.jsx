
import React, { PropTypes } from 'react';

import map from 'lodash/map';
import take from 'lodash/take';

import RecipeCard from 'components/tmp/RecipeCard';

const renderRecipe = (recipe, index) => (
  <RecipeCard
    alternative
    key={recipe.externalUrl || recipe.id || index}
    recipe={recipe}
  />
);

const RecipeAlternativeRecipes = ({ alternativeRecipes }) => (
  <div className="RecipePage-alternativeRecipes">
    {map(take(alternativeRecipes.entries, 2), renderRecipe)}
  </div>
);

RecipeAlternativeRecipes.propTypes = {
  alternativeRecipes: PropTypes.shape({
    entries: PropTypes.array,
  }),
};

export default RecipeAlternativeRecipes;
