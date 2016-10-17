
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import partial from 'lodash/partial';

import Icon from 'components/ui-elements/Icon';

import iconCheckRecipe from 'assets/images/icons/icon-check-recipe.svg';
import './styles.css';

const getInitials = text =>
  text.match(/\b(\w)/g).join('').toUpperCase();

const OnboardingBubble = ({
  checked, disabled, icon, geometry, style, text,
  onChange, image, imageSet, large,
}) => {
  const rootClasses = classnames('OnboardingBubble', {
    'is-disabled': disabled,
    'is-large': large,
    [`is-${style}`]: checked && style,
  });

  const selection = checked && style !== 'blocked' && (
    <div className="OnboardingBubble-selection">
      <Icon
        glyph={iconCheckRecipe}
        style={{ height: '25px', width: '31px' }}
      />
    </div>
  );

  return (
    <div
      className={rootClasses}
      onClick={disabled ? undefined : partial(onChange, !checked)}
    >
      <div className="OnboardingBubble-circle">
        {image &&
          <img
            alt=""
            src={image}
            srcSet={imageSet}
          />
        }

        {icon &&
          <Icon glyph={icon} style={geometry} />
        }

        {!icon && !image && !!text &&
          <div className="OnboardingBubble-initials">
            {getInitials(text)}
          </div>
        }

        {selection}
      </div>

      <div className="OnboardingBubble-title">
        {text}
      </div>
    </div>
  );
};

OnboardingBubble.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  geometry: PropTypes.object,
  icon: PropTypes.string,
  image: PropTypes.string,
  imageSet: PropTypes.string,
  large: PropTypes.bool,
  style: PropTypes.oneOf([
    'active', 'blocked',
  ]),
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

OnboardingBubble.defaultProps = {
  style: 'active',
};

export default OnboardingBubble;
