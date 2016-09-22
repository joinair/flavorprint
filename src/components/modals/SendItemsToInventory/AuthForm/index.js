
import React, { Component, PropTypes } from 'react';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import noop from 'lodash/noop';
import partial from 'lodash/partial';

import iconAt from 'assets/images/icons/icon-at.svg';
import iconLock from 'assets/images/icons/icon-lock.svg';
import './styles.css';

import Input from 'components/ui-elements/Input';

class SendItemsToInventoryAuthForm extends Component {
  constructor(props) {
    super(props);

    this.submit = bind(this.submit, this);
    this.handleFieldChange = bind(this.handleFieldChange, this);
    this.handleFieldSubmit = bind(this.handleFieldSubmit, this);

    this.state = {
      fields: {
        email: '',
        password: '',
      },
    };
  }

  submit() {
    const { onAuth, onSuccessfulAuth } = this.props;
    const { fields } = this.state;

    onAuth(fields).subscribe(onSuccessfulAuth, noop);
  }

  handleFieldChange(key, value) {
    this.setState({
      fields: assign({}, this.state.fields, { [key]: value }),
    });
  }

  handleFieldSubmit(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    const { entry, error } = this.props;
    const { signupUrl, forgotPasswordUrl, inventory: { name } } = entry;
    const { email, password } = this.state.fields;

    const errorMessage = error && (
      <div className="SendItemsToInventoryAuthForm-error">
        Please check your email and password and try again.
      </div>
    );

    return (
      <div className="SendItemsToInventoryAuthForm">
        {errorMessage}

        <div className="SendItemsToInventoryAuthForm-fields">
          <div className="SendItemsToInventoryAuthForm-field">
            <Input
              icon={iconAt}
              iconStyle={{ height: 16, width: 18 }}
              name="email"
              placeholder={`${name} email`}
              type="email"
              value={email}
              onChange={partial(this.handleFieldChange, 'email')}
              onSubmit={partial(this.handleFieldSubmit, 'password')}
            />
          </div>

          <div className="SendItemsToInventoryAuthForm-field">
            <Input
              icon={iconLock}
              iconStyle={{ height: 19, width: 15 }}
              name="password"
              placeholder={`${name} password`}
              ref="password"
              type="password"
              value={password}
              onChange={partial(this.handleFieldChange, 'password')}
              onSubmit={this.submit}
            />
          </div>
        </div>

        <div className="SendItemsToInventoryAuthForm-service">
          <a href={signupUrl} target="_blank">
            Create an account
          </a>

          {' or '}

          <a href={forgotPasswordUrl} target="_blank">
            forgot password
          </a>
        </div>
      </div>
    );
  }
}

SendItemsToInventoryAuthForm.propTypes = {
  entry: PropTypes.shape({
    forgotPasswordUrl: PropTypes.string.isRequired,
    inventory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    signupUrl: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.bool,
  onAuth: PropTypes.func.isRequired,
  onSuccessfulAuth: PropTypes.func.isRequired,
};

export default SendItemsToInventoryAuthForm;
