
import React, { PropTypes } from 'react';

import map from 'lodash/map';
import partial from 'lodash/partial';

import OnboardingRecipe from '../OnboardingRecipe';

import './styles.css';

const OnboardingRecipesStep = ({ recipes, onSelectRecipe, selectedRecipes }) => (
  <div className="OnboardingRecipesStep">
    {map(recipes, (recipe, id) => (
      <div key={id} className="OnboardingRecipesStep-recipe">
        <OnboardingRecipe
          recipe={recipe}
          selected={selectedRecipes.indexOf(recipe.sourceId) >= 0}
          onClick={partial(onSelectRecipe, recipe.sourceId)}
        />
      </div>
    ))}
  </div>
);

OnboardingRecipesStep.propTypes = {
  recipes: PropTypes.array.isRequired,
  selectedRecipes: PropTypes.array.isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};

export default OnboardingRecipesStep;
