
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import partial from 'lodash/partial';
import reduce from 'lodash/reduce';

import iconLock from 'assets/images/icons/icon-lock.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import Input from 'components/ui-elements/Input';

const CONFIRMATION_PASSWORD_DOESNT_MATCH = 'Confirmation password doesn\'t match the password';

const isValid = fields => {
  const { newPassword, newPasswordConfirm } = fields;

  if (!newPassword || !newPasswordConfirm) {
    return false;
  }

  if (newPassword !== newPasswordConfirm) {
    return false;
  }

  return true;
};

const getErrors = fields => {
  const { newPassword, newPasswordConfirm } = fields;
  const errors = {};

  if (newPassword !== newPasswordConfirm) {
    errors.newPasswordConfirm = CONFIRMATION_PASSWORD_DOESNT_MATCH;
  }

  return errors;
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleReset = bind(this.handleReset, this);
    this.handleSubmit = bind(this.handleSubmit, this);

    this.state = {
      errors: {},
      fields: {
        newPassword: null,
        newPasswordConfirm: null,
      },
    };
  }

  handleChange(field, value) {
    const newFields = assign({}, this.state.fields, { [field]: value });
    const newErrors = getErrors(newFields);

    this.setState({
      errors: newErrors,
      fields: newFields,
    });
  }

  handleReset() {
    const { onPasswordReset, showNotification } = this.props;
    const { fields } = this.state;
    const { newPassword } = fields;

    if (!isValid(fields)) {
      return this.setState({ errors: getErrors(fields) });
    }

    const onSuccess = () => {
      showNotification('Your password has been updated');
    };

    const onError = ({ httpCode, fields_ }) => {
      if (httpCode === 400) {
        this.setState({
          errors: reduce(
            fields_,
            (errors, { desc }, key) => assign(errors, { [key]: desc }),
            {}
          ),
        });
      }
    };

    onPasswordReset(newPassword).subscribe(onSuccess, onError);
  }

  handleSubmit(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    const { errors, fields } = this.state;

    return (
      <div className="ResetPassword">
        <Helmet title="Reset password - Whisk" />

        <div className="ResetPassword-formContainer">
          <div className="ResetPassword-header">
            <div className="ResetPassword-title">
              Reset password
            </div>
          </div>

          <div className="ResetPassword-form">
            <div className="ResetPassword-field">
              <Input
                autoFocus
                error={errors.newPassword}
                icon={iconLock}
                iconStyle={{ height: 19, width: 15 }}
                placeholder="New password"
                type="password"
                value={fields.newPassword}
                onChange={partial(this.handleChange, 'newPassword')}
                onSubmit={partial(this.handleSubmit, 'newPasswordConfirm')}
              />
            </div>
            <div className="ResetPassword-field">
              <Input
                error={errors.newPasswordConfirm}
                icon={iconLock}
                iconStyle={{ height: 19, width: 15 }}
                placeholder="Confirm password"
                ref="newPasswordConfirm"
                type="password"
                value={fields.newPasswordConfirm}
                onChange={partial(this.handleChange, 'newPasswordConfirm')}
                onSubmit={this.handleReset}
              />
            </div>
            <Button
              className="ResetPassword-action"
              fluid
              size="large"
              onClick={this.handleReset}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  onPasswordReset: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default ResetPassword;
