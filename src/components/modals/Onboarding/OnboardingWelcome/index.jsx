
import React, { Component, PropTypes } from 'react';

import Timer from 'helpers/Timer';

import iconHeart from 'assets/images/icons/icon-heart.svg';

import Icon from 'components/ui-elements/Icon';
import Preloader from 'components/ui-elements/Preloader';

const TIMEOUT = 10000;

class OnboardingWelcome extends Component {
  componentDidMount() {
    this._timer = new Timer(this.props.onClose, TIMEOUT);
  }

  componentWillUnmount() {
    this._timer.clear();
  }

  render() {
    const { profile } = this.props;

    return (
      <div className="Onboarding-loadLayout">
        <div className="Onboarding-loadLayout-container">
          <Preloader />
          <div className="Onboarding-loadLayout-title">
            Hey {profile.firstName}, we’re setting up your recipe feed
          </div>
          <div className="Onboarding-loadLayout-desc">
            <span>Tap the</span>
            <Icon
              className="Onboarding-loadLayout-icon"
              glyph={iconHeart}
            />
            <span>to save recipes and teach Whisk what you like.</span>
          </div>
        </div>
      </div>
    );
  }
}

OnboardingWelcome.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OnboardingWelcome;
