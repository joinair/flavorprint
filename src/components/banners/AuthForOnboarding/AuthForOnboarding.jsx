
import React, { PropTypes } from 'react';

import Button from 'components/ui-elements/Button';
import BodyClassName from 'components/ui-elements/BodyClassName';

import './styles.css';

const AuthForOnboarding = ({
  isVisible,
  onLogInButtonClick,
  onSignUpButtonClick,
}) => {
  if (!isVisible) return null;

  return (
    <BodyClassName className="is-authForOnboardingBannerVisible">
      <div className="AuthForOnboardingBanner">
        <div className="AuthForOnboardingBanner-inner">
          <div className="AuthForOnboardingBanner-tagline">
            Sign in to save any recipe in the world
            and get personal recommendations
          </div>

          <div className="AuthForOnboardingBanner-actions">
            <Button
              className="AuthForOnboardingBanner-action"
              size="large"
              onClick={onSignUpButtonClick}
            >
              Sign up
            </Button>

            <Button
              className="AuthForOnboardingBanner-action"
              color="grey"
              size="large"
              onClick={onLogInButtonClick}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </BodyClassName>
  );
};

AuthForOnboarding.propTypes = {
  isVisible: PropTypes.bool,
  onLogInButtonClick: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

export default AuthForOnboarding;
