
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import includes from 'lodash/includes';
import partial from 'lodash/partial';

import { domain } from 'constants/Config';
import { UTM_MEDIUM, UTM_SOURCE } from 'constants/QueryParams';

import iconFacebook from 'assets/images/icons/icon-facebook.svg';
import iconTwitter from 'assets/images/icons/icon-twitter.svg';
import iconGPlus from 'assets/images/icons/icon-gplus.svg';
import iconPinterest from 'assets/images/icons/icon-pinterest.svg';

import './styles.css';

import Icon from 'components/ui-elements/Icon';

const SharingIcons = ({ className, config, rounded, small, path, onShare }) => {
  const iconsClasses = classnames(
    'SharingIcons',
    {
      'SharingIcons--small': small,
      'SharingIcons--rounded': rounded,
    },
    className
  );

  const hasQuery = includes(path, '?');

  const url = encodeURIComponent(
    `${domain}${path}${hasQuery ? '&' : '?'}${UTM_MEDIUM}=sharing&${UTM_SOURCE}=`
  );

  return (
    <div className={iconsClasses}>
      <div
        className="SharingIcons-item SharingIcons-item--facebook"
        onClick={partial(onShare, 'facebook', `${url}facebook`)}
      >
        <Icon className="SharingIcons-icon" glyph={iconFacebook} />
      </div>

      <div
        className="SharingIcons-item SharingIcons-item--twitter"
        onClick={partial(onShare, 'twitter', `${url}twitter`, config.twitter)}
      >
        <Icon className="SharingIcons-icon" glyph={iconTwitter} />
      </div>

      <div
        className="SharingIcons-item SharingIcons-item--gplus"
        onClick={partial(onShare, 'google', `${url}googleplus`)}
      >
        <Icon className="SharingIcons-icon" glyph={iconGPlus} />
      </div>

      <div
        className="SharingIcons-item SharingIcons-item--pinterest"
        onClick={partial(onShare, 'pinterest', `${url}pinterest`, config.pinterest)}
      >
        <Icon className="SharingIcons-icon" glyph={iconPinterest} />
      </div>
    </div>
  );
};

SharingIcons.propTypes = {
  className: PropTypes.string,
  config: PropTypes.object,
  path: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  onShare: PropTypes.func.isRequired,
};

export default SharingIcons;
