
import React, { PropTypes } from 'react';

import Icon from 'components/ui-elements/Icon';

import iconCheckRecipe from 'assets/images/icons/icon-check-recipe.svg';
import './styles.css';

const OnboardingRecipe = ({ recipe, selected, onSelect }) => {
  const selection = selected && (
    <div className="OnboardingRecipe-selection">
      <Icon
        glyph={iconCheckRecipe}
        style={{ height: '56px', width: '70px' }}
      />
    </div>
  );

  return (
    <div className="OnboardingRecipe" onClick={onSelect}>
      <div className="OnboardingRecipe-containerImage">
        <img
          alt=""
          className="OnboardingRecipe-image"
          src={recipe.imageUrl}
          maxHeight={190}
          maxWidth={190}
        />
        {selection}
      </div>

      <div className="OnboardingRecipe-title">
        {recipe.title}
      </div>
    </div>
  );
};

OnboardingRecipe.propTypes = {
  recipe: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default OnboardingRecipe;
