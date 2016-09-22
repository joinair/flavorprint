
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import './styles.css';
import Icon from 'components/ui-elements/Icon';

const Button = ({
  children, color, fluid, outline, size, media, disabled, className, type,
  icon, iconBefore, iconStyle,
  onClick,
}) => {
  const buttonClasses = classnames(
    'Button',
    {
      [`Button--${color}`]: color,
      [`Button--${size}`]: size,
      'Button--fluid': fluid,
      'Button--outline': outline,
      'Button--iconAfter': icon && !iconBefore && children,
      'Button--iconBefore': icon && iconBefore && children,
      'Button--iconOnly': icon && !children,
      'is-disabled': disabled,
    },
    media,
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      type={type}
      onClick={!disabled && onClick}
    >
      {icon &&
        <div className="Button-iconContainer">
          <Icon
            className="Button-icon"
            glyph={icon}
            style={iconStyle}
          />
        </div>
      }
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'danger', 'grey', 'transparent']),
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
  iconBefore: PropTypes.bool,
  iconStyle: PropTypes.object,
  media: PropTypes.string,
  outline: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'normal', 'large', 'xLarge']),
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  color: 'primary',
  disabled: false,
  fluid: false,
  icon: '',
  iconBefore: true,
  iconStyle: {},
  media: '',
  outline: false,
  size: 'normal',
  onClick: null,
};

export default Button;
