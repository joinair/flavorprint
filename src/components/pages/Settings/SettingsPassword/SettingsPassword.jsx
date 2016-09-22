
import React, { Component, PropTypes } from 'react';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import get from 'lodash/get';
import partial from 'lodash/partial';
import reduce from 'lodash/reduce';

import iconLock from 'assets/images/icons/icon-lock.svg';

import Button from 'components/ui-elements/Button';
import Input from 'components/ui-elements/Input';
import FormControl from 'components/pages/Settings/Form/FormControl';
import FormGroup from 'components/pages/Settings/Form/FormGroup';

const SHOW_STATE = 'SHOW_STATE';
const EDIT_STATE = 'EDIT_STATE';

const getInitialState = () => ({
  currentState: SHOW_STATE,
  errors: {},
  fields: {
    currentPassword: null,
    newPassword: null,
    newPasswordConfirm: null,
  },
});

const isValid = fields => {
  const { currentPassword, newPassword, newPasswordConfirm } = fields;

  if (!currentPassword || !newPassword || !newPasswordConfirm) {
    return false;
  }

  if (newPassword !== newPasswordConfirm) {
    return false;
  }

  return true;
};

const EMPTY_PASSWORD_MESSAGE = 'This field is required';
const CURRENT_PASSWORD_IS_INCORRECT = 'Current password is incorrect';
const CONFIRMATION_PASSWORD_DOESNT_MATCH = 'Confirmation password doesn\'t match the password';

const getErrors = fields => {
  const { currentPassword, newPassword, newPasswordConfirm } = fields;
  const errors = {};

  if (!currentPassword) {
    errors.currentPassword = EMPTY_PASSWORD_MESSAGE;
  }

  if (newPassword !== newPasswordConfirm) {
    errors.newPasswordConfirm = CONFIRMATION_PASSWORD_DOESNT_MATCH;
  }

  return errors;
};

class SettingsPassword extends Component {
  constructor(props) {
    super(props);

    this.startEdit = bind(this.startEdit, this);
    this.cancelEdit = bind(this.cancelEdit, this);
    this.handleChange = bind(this.handleChange, this);
    this.handleSubmit = bind(this.handleSubmit, this);
    this.updatePassword = bind(this.updatePassword, this);

    this.state = getInitialState();
  }

  startEdit() {
    this.setState({ currentState: EDIT_STATE });
  }

  cancelEdit() {
    this.setState(getInitialState());
  }

  updatePassword() {
    const { onPasswordUpdate, showNotification } = this.props;
    const { currentPassword, newPassword } = this.state.fields;

    if (!isValid(this.state.fields)) {
      return this.setState({ errors: getErrors(this.state.fields) });
    }

    const onSuccess = () => {
      showNotification('Your password has been updated');
      this.cancelEdit();
    };
    const onError = ({ code, httpCode, fields }) => {
      if (code === 'auth.invalidCredentials') {
        this.setState({
          errors: {
            currentPassword: CURRENT_PASSWORD_IS_INCORRECT,
          },
        });
      } else if (httpCode === 400) {
        this.setState({
          errors: reduce(
            fields,
            (errors, { desc }, key) => assign(errors, { [key]: desc }),
            {}
          ),
        });
      }
    };

    onPasswordUpdate(currentPassword, newPassword)
      .subscribe(onSuccess, onError);
  }

  handleChange(field, eventOrValue) {
    const newFields = assign(
      {},
      this.state.fields,
      { [field]: get(eventOrValue, 'target.value', eventOrValue) }
    );
    const newErrors = getErrors(newFields);

    this.setState({
      errors: newErrors,
      fields: newFields,
    });
  }

  handleSubmit(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    const { onForgotPassword } = this.props;
    const { currentState, errors, fields } = this.state;
    const isMultiline = currentState === EDIT_STATE;

    let content;
    if (currentState === SHOW_STATE) {
      content = (
        <div className="Settings-formControl-text">
          <a className="Settings-formLink" onClick={this.startEdit}>
            Change password
          </a>
        </div>
      );
    } else {
      content = (
        <span>
          <div className="Settings-formControl-wrap">
            <Input
              error={errors.currentPassword}
              icon={iconLock}
              iconStyle={{ height: 19, width: 15 }}
              placeholder="Current password"
              type="password"
              value={fields.currentPassword}
              onChange={partial(this.handleChange, 'currentPassword')}
              onSubmit={partial(this.handleSubmit, 'newPassword')}
            />
          </div>

          <div>
            <a
              className="Settings-formLink"
              onClick={onForgotPassword}
            >
              Forgot password
            </a>
          </div>

          <div>
            <FormGroup topDivider>
              <FormControl>
                <Input
                  error={errors.newPassword}
                  icon={iconLock}
                  iconStyle={{ height: 19, width: 15 }}
                  placeholder="New password"
                  ref="newPassword"
                  type="password"
                  value={fields.newPassword}
                  onChange={partial(this.handleChange, 'newPassword')}
                  onSubmit={partial(this.handleSubmit, 'newPasswordConfirm')}
                />
              </FormControl>
            </FormGroup>

            <FormGroup noDivider>
              <FormControl>
                <Input
                  error={errors.newPasswordConfirm}
                  icon={iconLock}
                  iconStyle={{ height: 19, width: 15 }}
                  placeholder="Confirm new password"
                  ref="newPasswordConfirm"
                  type="password"
                  value={fields.newPasswordConfirm}
                  onChange={partial(this.handleChange, 'newPasswordConfirm')}
                  onSubmit={this.updatePassword}
                />
              </FormControl>
            </FormGroup>

            <FormGroup className="Settings-passwordActionGroup" noDivider>
              <Button
                className=
                  "Settings-passwordActionGroup-item Settings-passwordActionGroup-item--save"
                disabled={!isValid(fields)}
                onClick={this.updatePassword}
              >
                Change password
              </Button>

              <Button
                className=
                  "Settings-passwordActionGroup-item Settings-passwordActionGroup-item--cancel"
                outline
                onClick={this.cancelEdit}
              >
                Cancel
              </Button>
            </FormGroup>
          </div>
        </span>
      );
    }

    return (
      <FormGroup label="Password" multiline={isMultiline}>
        <FormControl>
          {content}
        </FormControl>
      </FormGroup>
    );
  }
}

SettingsPassword.propTypes = {
  onForgotPassword: PropTypes.func.isRequired,
  onPasswordUpdate: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default SettingsPassword;
