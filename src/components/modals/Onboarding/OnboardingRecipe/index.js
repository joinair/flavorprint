
import React, { PropTypes } from 'react';

import { recipeImageUrl } from 'helpers/recipe';

import './styles.css';

const OnboardingRecipe = ({ recipe, onClick, selected }) => {
  const image = recipeImageUrl(recipe);

  return (
    <div
      className="OnboardingRecipe"
      onClick={onClick}
    >
      <div className="OnboardingRecipe-image">
        {image && (
          <img
            alt=""
            src={image.link}
          />
        )}
        {selected && (
          <div className="OnboardingRecipe-selectedCover" />
        )}
      </div>
      <div className="OnboardingRecipe-caption">
        {recipe.title}
      </div>
    </div>
  );
};

OnboardingRecipe.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  selected: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
};

export default OnboardingRecipe;
