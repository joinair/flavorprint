
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import partial from 'lodash/partial';

import iconAt from 'assets/images/icons/icon-at.svg';
import iconLock from 'assets/images/icons/icon-lock.svg';
import iconUser from 'assets/images/icons/icon-user.svg';
import iconLetter from 'assets/images/icons/icon-letter.svg';
import iconGoogle from 'assets/images/icons/icon-google.svg';
import iconFacebook from 'assets/images/icons/icon-facebook.svg';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import Input from 'components/ui-elements/Input';

const SELECT_METHOD = 'SELECT_METHOD';
const EMAIL_METHOD = 'EMAIL_METHOD';

const AuthenticationFormTerms = () => (
  <div className="AuthenticationForm-terms">
    <span>
      By creating an account you agree to our{' '}
      <a
        className="AuthenticationForm-terms-link"
        href="https://about.whisk.com/terms"
        target="_blank"
      >
        Terms & Conditions
      </a>
    </span>
  </div>
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = bind(this.handleSubmit, this);
    this.selectEmailMethod = bind(this.selectEmailMethod, this);
    this.onFormSubmit = bind(this.onFormSubmit, this);

    this.state = {
      screen: SELECT_METHOD,
    };
  }

  onFormSubmit(e) {
    this.props.onSignUp();
    e.preventDefault();
  }

  handleSubmit(nextField) {
    this.refs[nextField].focus();
  }

  selectEmailMethod() {
    this.setState({ screen: EMAIL_METHOD });
  }

  render() {
    const {
      errors, fields,
      onFacebookSignUp, onFieldChange, onGoogleSignUp,
    } = this.props;
    const { screen } = this.state;

    return screen === SELECT_METHOD
      ? (
        <div>
          <div
            className="AuthenticationForm-action AuthenticationForm-action--email"
            onClick={this.selectEmailMethod}
          >
            <div className="AuthenticationForm-action-iconContainer">
              <Icon
                className="AuthenticationForm-action-icon"
                glyph={iconLetter}
              />
            </div>
            <span>Sign up with Email</span>
          </div>

          <div className="AuthenticationForm-divider">
            <span className="AuthenticationForm-dividerText">Or</span>
          </div>

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
      ) : (
        <div>
          <form method="POST" target="#" onSubmit={this.onFormSubmit}>
            <div className="AuthenticationForm-fields AuthenticationForm-fields--signup">
              <div className="AuthenticationForm-fieldsRow">
                <div className="AuthenticationForm-field">
                  <Input
                    error={errors.firstName}
                    icon={iconUser}
                    iconStyle={{ height: 17, width: 17 }}
                    placeholder="First name"
                    name="first-name"
                    value={fields.firstName}
                    onChange={partial(onFieldChange, 'firstName')}
                    onSubmit={partial(this.handleSubmit, 'lastName')}
                  />
                </div>
                <div className="AuthenticationForm-field">
                  <Input
                    error={errors.lastName}
                    icon={iconUser}
                    iconStyle={{ height: 17, width: 17 }}
                    placeholder="Last name"
                    name="last-name"
                    ref="lastName"
                    value={fields.lastName}
                    onChange={partial(onFieldChange, 'lastName')}
                    onSubmit={partial(this.handleSubmit, 'email')}
                  />
                </div>
              </div>
              <div className="AuthenticationForm-field">
                <Input
                  error={errors.email}
                  icon={iconAt}
                  iconStyle={{ height: 16, width: 18 }}
                  placeholder="Email"
                  ref="email"
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={partial(onFieldChange, 'email')}
                  onSubmit={partial(this.handleSubmit, 'password')}
                />
              </div>
              <div className="AuthenticationForm-field">
                <Input
                  error={errors.password}
                  icon={iconLock}
                  iconStyle={{ height: 19, width: 15 }}
                  placeholder="Password"
                  ref="password"
                  type="password"
                  name="password"
                  value={fields.password}
                  onChange={partial(onFieldChange, 'password')}
                />
              </div>
            </div>

            <Button
              className="AuthenticationForm-action AuthenticationForm-action--signup"
              fluid
              size="large"
              type="submit"
            >
              Sign up
            </Button>
          </form>

          <AuthenticationFormTerms />
        </div>
      );
  }
}

SignUpForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
  }),
  fields: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,

  onFacebookSignUp: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onGoogleSignUp: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default SignUpForm;
