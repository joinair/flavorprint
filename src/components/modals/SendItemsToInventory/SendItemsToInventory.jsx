
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import partial from 'lodash/partial';

import './styles.css';

import Button from 'components/ui-elements/Button';
import Checkbox from 'components/ui-elements/Checkbox';
import ModalBody from 'components/tmp/Modal/ModalBody';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

import SendItemsToInventoryFAQ from './FAQ';
import SendItemsToInventoryAuthForm from './AuthForm';

const USE_SAVED_ACCOUNT = 'USE_SAVED_ACCOUNT';
const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

class SendItemsToInventory extends Component {
  constructor(props) {
    super(props);

    this.sendItems = bind(this.sendItems, this);
    this.changeMethod = bind(this.changeMethod, this);
    this.toggleFAQOpenness = bind(this.toggleFAQOpenness, this);

    this.state = {
      method: props.hasCredentials
        ? (this.props.error && CHANGE_ACCOUNT || USE_SAVED_ACCOUNT)
        : '',
      hasCredentials: props.hasCredentials,
      isFAQpened: false,
    };
  }

  toggleFAQOpenness() {
    this.setState({ isFAQpened: !this.state.isFAQpened });
  }

  changeMethod(method) {
    this.setState({ method });
  }

  sendItems() {
    if (this.refs.authForm) {
      this.refs.authForm.submit();
    } else {
      this.props.onSend();
    }
  }

  render() {
    const {
      entry, error, onClose, onCredentialsSubmit,
      onSend,
    } = this.props;
    const { hasCredentials, isFAQpened, method } = this.state;

    const modalTitle = hasCredentials
      ? `Send items to ${entry.inventory.name}`
      : `Link your ${entry.inventory.name} account to Whisk`;

    const hasMethods = hasCredentials;
    const hasAuthForm = error || !hasCredentials || method === CHANGE_ACCOUNT;

    return (
      <div className="SendItemsToInventory">
        <ModalHeader
          closeButton
          title={modalTitle}
          onHide={onClose}
        />

        <ModalBody>
          <div className="SendItemsToInventory-message">
            Which account should we send your list to?

            {!hasCredentials &&
              <span
                className="SendItemsToInventory-faqToggle"
                onClick={this.toggleFAQOpenness}
              >
                ?
              </span>
            }
          </div>

          {hasMethods &&
            <div className="SendItemsToInventory-methods">
              <div className="SendItemsToInventory-method">
                <Checkbox
                  checked={method === USE_SAVED_ACCOUNT}
                  label="Use saved account"
                  type="radio"
                  onChange={partial(this.changeMethod, USE_SAVED_ACCOUNT)}
                />
              </div>
              <div className="SendItemsToInventory-method">
                <Checkbox
                  checked={method === CHANGE_ACCOUNT}
                  label="Change account"
                  type="radio"
                  onChange={partial(this.changeMethod, CHANGE_ACCOUNT)}
                />
              </div>
            </div>
          }

          {hasAuthForm &&
            <SendItemsToInventoryAuthForm
              entry={entry}
              error={this.props.error}
              ref="authForm"
              onAuth={onCredentialsSubmit}
              onSuccessfulAuth={onSend}
            />
          }

          <div className="SendItemsToInventory-action">
            <Button fluid size="large" onClick={this.sendItems}>
              Send to {entry.inventory.name}
            </Button>
          </div>

          {isFAQpened &&
            <SendItemsToInventoryFAQ name={entry.inventory.name} />
          }
        </ModalBody>
      </div>
    );
  }
}

SendItemsToInventory.propTypes = {
  entry: PropTypes.shape({
    inventory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  error: PropTypes.bool,
  hasCredentials: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCredentialsSubmit: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default SendItemsToInventory;
