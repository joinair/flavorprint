
import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Icon from 'components/ui-elements/Icon';

import iconCheckRecipe from 'assets/images/icons/icon-check-recipe.svg';
import './styles.css';

const OnboardingRecipe = ({ recipe, onClick, selected }) => (
  <div
    className="OnboardingRecipe"
    onClick={onClick}
  >
    <div className="OnboardingRecipe-image">
      {recipe.image && (
        <img
          alt=""
          src={`/assets/images/static-images/recipes/${recipe.image}.png`}
        />
      )}
      <div
        className={classnames('OnboardingRecipe-selectedCover', {
          'is-visible': selected,
        })}
      >
        <Icon
          glyph={iconCheckRecipe}
          style={{ height: '25px', width: '31px' }}
        />
      </div>
    </div>
    <div className="OnboardingRecipe-caption">
      {recipe.title}
    </div>
  </div>
);

OnboardingRecipe.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  selected: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
};

export default OnboardingRecipe;
