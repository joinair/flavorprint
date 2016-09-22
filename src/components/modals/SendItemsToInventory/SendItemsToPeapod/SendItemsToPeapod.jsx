
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import Button from 'components/ui-elements/Button';
import ModalBody from 'components/tmp/Modal/ModalBody';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

import PeapodFAQ from './FAQ';

import '../styles.css';

class SendItemsToPeapod extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggleFAQOpenness = bind(this.toggleFAQOpenness, this);
    this.onLogin = bind(this.onLogin, this);

    this.state = {
      isFAQpened: false,
      isLocked: false,
    };
  }

  onLogin() {
    const { onLogin } = this.props;
    this.setState({ isLocked: true });

    onLogin().subscribe(() => {
      this.setState({ isLocked: false });
    }, () => {
      this.setState({ isLocked: false });
    });
  }

  toggleFAQOpenness() {
    this.setState({ isFAQpened: !this.state.isFAQpened });
  }

  renderZipConflict() {
    const { zip, city } = this.props.regionConfig.pendingConfig;
    const { onChangeZip } = this.props;

    return (
      <div>
        <div className="SendItemsToInventory-message">
          Your Peapod account is associated with a different zipcode
          than the one you have selected.  Some of the items you have
          selected might not be available in your area.
          <br /><br />
          Please change your zipcode to see accurate item selections.
        </div>

        <Button onClick={onChangeZip} fluid size="large">
          Change zipcode to {zip} ({city})
        </Button>
      </div>
    );
  }

  renderLogIn() {
    const { createAccountHref } = this.props;
    const { isLocked } = this.state;

    return (
      <div>
        <div className="SendItemsToInventory-message">
          Which account should we send your list to?
          <span
            className="SendItemsToInventory-faqToggle"
            onClick={this.toggleFAQOpenness}
          >
            ?
          </span>
        </div>

        <Button disabled={isLocked} onClick={this.onLogin} fluid size="large">
          Log in with Peapod
        </Button>
        <a className="SendItemsToInventory-link" href={createAccountHref} target="_blank">
          Create an account
        </a>
      </div>
    );
  }

  renderSendToPeapod() {
    const { onSend } = this.props;
    const { isLocked } = this.state;

    return (
      <div>
        <div className="SendItemsToInventory-message">
          You've already linked your Peapod account to Whisk.
          Click "Send to Peapod" below and we'll add your items
          to your cart or you can log in with a different account.
        </div>

        <Button onClick={onSend} disabled={isLocked} fluid size="large">
          Send to Peapod
        </Button>
        <a className="SendItemsToInventory-link" onClick={this.onLogin}>
          Log in with a different Peapod account
        </a>
      </div>
    );
  }

  render() {
    const { onClose, hasCredentials, regionConfig } = this.props;
    const { isConflicting } = regionConfig;

    const modalTitle = hasCredentials ?
      'Send items to Peapod' :
      'Link your Peapod account to Whisk';

    const isFAQpened = !hasCredentials && this.state.isFAQpened;

    const checkForLogin = () => hasCredentials ? this.renderSendToPeapod() : this.renderLogIn();
    const checkForConflict = isConflicting ? this.renderZipConflict() : checkForLogin();

    return (
      <div className="SendItemsToInventory">
        <ModalHeader
          closeButton
          title={modalTitle}
          onHide={onClose}
        />

        <ModalBody>
          {checkForConflict}

          {isFAQpened &&
            <PeapodFAQ />
          }
        </ModalBody>
      </div>
    );
  }
}

SendItemsToPeapod.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onChangeZip: PropTypes.func.isRequired,

  createAccountHref: PropTypes.string.isRequired,
  hasCredentials: PropTypes.bool.isRequired,

  regionConfig: PropTypes.shape({
    config: PropTypes.object.isRequired,
    pendingConfig: PropTypes.object,
    isConflicting: PropTypes.bool.isRequired,
  }).isRequired,
};

export default SendItemsToPeapod;
