
import React, { PropTypes } from 'react';

import iconGoogle from 'assets/images/icons/icon-google.svg';
import iconFacebook from 'assets/images/icons/icon-facebook.svg';

import Icon from 'components/ui-elements/Icon';
import AuthenticationFormTerms from './FormTerms';
import FormHeading from './FormHeading';

const LogInForm = ({ onFacebookLogIn, onGoogleLogIn }) => (
  <div>
    <FormHeading>
      Log in to get<br />
      your FlavorPrint
    </FormHeading>
    <div className="AuthenticationForm-socialButtons">
      <div
        className=
          "AuthenticationForm-socialButton AuthenticationForm-socialButton--facebook"
        onClick={onFacebookLogIn}
      >
        <div className="AuthenticationForm-socialButton-iconContainer">
          <Icon
            className="AuthenticationForm-socialButton-icon"
            glyph={iconFacebook}
          />
        </div>
        <span>Log in with Facebook</span>
      </div>

      <div
        className=
          "AuthenticationForm-socialButton AuthenticationForm-socialButton--google"
        onClick={onGoogleLogIn}
      >
        <div className="AuthenticationForm-socialButton-iconContainer">
          <Icon
            className="AuthenticationForm-socialButton-icon"
            glyph={iconGoogle}
          />
        </div>
        <span>Log in with Google</span>
      </div>
    </div>

    <AuthenticationFormTerms />
  </div>
);

LogInForm.propTypes = {
  onFacebookLogIn: PropTypes.func.isRequired,
  onGoogleLogIn: PropTypes.func.isRequired,
};

export default LogInForm;
