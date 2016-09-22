
import React, { PropTypes } from 'react';

import iconClose from 'assets/images/icons/icon-close.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';

const OnboardingHeader = ({ title, subtitle, onClose }) => (
  <div className="OnboardingHeader">
    <div className="OnboardingHeader-close" onClick={onClose}>
      <div className="OnboardingHeader-close-iconContainer">
        <Icon
          className="OnboardingHeader-close-icon"
          glyph={iconClose}
        />
      </div>
    </div>
    <div className="OnboardingHeader-title">
      <div className="OnboardingHeader-title-text">
        <div className="OnboardingHeader-title-main">
          {title}
        </div>
        {!!subtitle &&
          <div className="OnboardingHeader-title-sub">
            {subtitle}
          </div>
        }
      </div>
    </div>
  </div>
);

OnboardingHeader.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OnboardingHeader;
