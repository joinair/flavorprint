
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import iconChef from 'assets/images/icons/icon-chef.svg';
import iconChefChangeable from 'assets/images/icons/icon-chef-changeable.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';

const Avatar = ({
  changeable, className, height, iconClassName, url, width,
  onClick,
}) => {
  const avatarClasses = classnames(
    'Avatar',
    { 'Avatar--changeable': changeable },
    className
  );

  return url
    ? (
      <img
        alt=""
        className={avatarClasses}
        height={height}
        src={url}
        width={width}
        onClick={onClick}
      />
    ) : (
      <span
        className={avatarClasses}
        onClick={onClick}
      >
        <Icon
          className={classnames('Avatar-icon', iconClassName)}
          glyph={changeable ? iconChefChangeable : iconChef}
        />
      </span>
    );
};

Avatar.propTypes = {
  changeable: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.number,
  iconClassName: PropTypes.string,
  url: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func,
};

Avatar.defaultProps = {
  height: 106,
  width: 106,
};

export default Avatar;
