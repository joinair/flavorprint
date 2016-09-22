
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import partial from 'lodash/partial';

import iconAt from 'assets/images/icons/icon-at.svg';
import iconLock from 'assets/images/icons/icon-lock.svg';
import iconGoogle from 'assets/images/icons/icon-google.svg';
import iconFacebook from 'assets/images/icons/icon-facebook.svg';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import Input from 'components/ui-elements/Input';

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = bind(this.handleSubmit, this);
    this.onFormSubmit = bind(this.onFormSubmit, this);
  }

  onFormSubmit(e) {
    this.props.onLogIn();
    e.preventDefault();
    return false;
  }

  handleSubmit(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    const {
      errors, fields,
      onFacebookLogIn, onFieldChange, onForgotPassword, onGoogleLogIn,
    } = this.props;

    return (
      <div>
        <form method="POST" target="#" onSubmit={this.onFormSubmit}>
          <div className="AuthenticationForm-fields">
            <div className="AuthenticationForm-field">
              <Input
                error={errors.email}
                icon={iconAt}
                iconStyle={{ height: 16, width: 18 }}
                placeholder="Email"
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
          <div className="AuthenticationForm-helpers">
            <div className="AuthenticationForm-helper">
              <a
                className="AuthenticationForm-forgotPassword"
                onClick={onForgotPassword}
              >
                Forgot password?
              </a>
            </div>
          </div>
          <Button fluid size="large" type="submit">
            Log In
          </Button>

          <div className="AuthenticationForm-divider">
            <span className="AuthenticationForm-dividerText">Or</span>
          </div>

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
        </form>
      </div>
    );
  }
}

LogInForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  fields: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  onFacebookLogIn: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onGoogleLogIn: PropTypes.func.isRequired,
  onLogIn: PropTypes.func.isRequired,
};

export default LogInForm;
