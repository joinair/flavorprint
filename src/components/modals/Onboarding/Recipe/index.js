
import React, { PropTypes } from 'react';

import Icon from 'components/ui-elements/Icon';
import LazyImage from 'components/ui-elements/LazyImage';

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
        <LazyImage
          className="OnboardingRecipe-image"
          image={{ url: recipe.imageUrl }}
          maxHeight={190}
          maxWidth={190}
          previewTransformation="c_fill,f_auto,e_blur:3000"
          transformation="c_fill,f_auto,e_sharpen"
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
