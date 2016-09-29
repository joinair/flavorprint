
import React, { PropTypes } from 'react';

import iconGoogle from 'assets/images/icons/icon-google.svg';
import iconFacebook from 'assets/images/icons/icon-facebook.svg';

import Icon from 'components/ui-elements/Icon';
import AuthenticationFormTerms from './FormTerms';
import FormHeading from './FormHeading';

const SignUpForm = ({ onFacebookSignUp, onGoogleSignUp }) => (
  <div>
    <FormHeading>
      Sign up to save<br />
      your FlavorPrint
    </FormHeading>
    <div className="AuthenticationForm-socialButtons">
      <div
        className=
          "AuthenticationForm-socialButton AuthenticationForm-socialButton--facebook"
        onClick={onFacebookSignUp}
      >
        <div className="AuthenticationForm-socialButton-iconContainer">
          <Icon
            className="AuthenticationForm-socialButton-icon"
            glyph={iconFacebook}
          />
        </div>
        <span>Sign up with Facebook</span>
      </div>

      <div
        className=
          "AuthenticationForm-socialButton AuthenticationForm-socialButton--google"
        onClick={onGoogleSignUp}
      >
        <div className="AuthenticationForm-socialButton-iconContainer">
          <Icon
            className="AuthenticationForm-socialButton-icon"
            glyph={iconGoogle}
          />
        </div>
        <span>Sign up with Google</span>
      </div>
    </div>

    <AuthenticationFormTerms />
  </div>
);

SignUpForm.propTypes = {
  onFacebookSignUp: PropTypes.func.isRequired,
  onGoogleSignUp: PropTypes.func.isRequired,
};

export default SignUpForm;
