
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import iconAt from 'assets/images/icons/icon-at.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import Input from 'components/ui-elements/Input';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

const userNotFoundMessage = email =>
  `No account exists for ${email}. Maybe you signed up using a different e-mail address?`;

class RequestResetPasswordModal extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleRequest = bind(this.handleRequest, this);

    this.state = { email: props.email, error: null };
  }

  handleChange(value) {
    this.setState({ email: value, error: null });
  }

  handleRequest() {
    const { onClose, onRequest, showNotification } = this.props;
    const { email } = this.state;

    const onSuccess = () => {
      showNotification(`A link to reset your password has been sent to ${email}.`);
      onClose();
    };

    const onError = ({ code, desc }) => {
      const error = code === 'auth.userNotFound'
        ? userNotFoundMessage(email)
        : desc;

      this.setState({ error });
    };

    onRequest(email).subscribe(onSuccess, onError);
  }

  render() {
    const { onClose } = this.props;
    const { email, error } = this.state;

    return (
      <div className="RequestResetPasswordModal">
        <ModalHeader
          closeButton
          title="Reset password"
          onHide={onClose}
        />

        <div className="RequestResetPasswordModal-form">
          <div className="RequestResetPasswordModal-message">
            Enter the email address associated with your account,
            and we'll email you a link to reset your password.
          </div>

          <div className="RequestResetPasswordModal-field">
            <Input
              autoFocus
              error={error}
              icon={iconAt}
              iconStyle={{ height: 16, width: 18 }}
              placeholder="Email"
              type="email"
              value={email}
              onChange={this.handleChange}
              onSubmit={this.handleRequest}
            />
          </div>

          <Button fluid size="large" onClick={this.handleRequest}>
            Send reset link
          </Button>
        </div>
      </div>
    );
  }
}

RequestResetPasswordModal.propTypes = {
  email: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default RequestResetPasswordModal;
