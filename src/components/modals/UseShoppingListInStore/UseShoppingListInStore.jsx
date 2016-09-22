
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import popupWindowPosition from 'helpers/popupWindowPosition';

import { PRINT_SHOPPING_LIST } from 'constants/Routes';

import iconAt from 'assets/images/icons/icon-at.svg';
import iconPrint from 'assets/images/icons/icon-print.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import Input from 'components/ui-elements/Input';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

class UseShoppingListInStore extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleSend = bind(this.handleSend, this);

    this.state = { email: props.email, error: null, sendDisabled: null };
  }

  handleChange(value) {
    this.setState({ email: value, error: null });
  }

  handlePrint() {
    const width = 900;
    const height = 600;
    const { left, top } = popupWindowPosition(width, height);

    const printWindow = window.open(
      PRINT_SHOPPING_LIST,
      '',
      'scrollbars=1,resizable=1,' +
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (printWindow && printWindow.focus) { printWindow.focus(); }
  }

  handleSend() {
    const { onClose, onSend, showNotification } = this.props;
    const { email } = this.state;

    this.setState({ sendDisabled: true });

    const onSuccess = () => {
      showNotification(`Your shopping list has been sent to ${email}.`);
      onClose();
    };

    const onError = ({ desc }) => {
      this.setState({ error: desc, sendDisabled: false });
    };

    onSend(email).subscribe(onSuccess, onError);
  }

  render() {
    const { hasItems, isTizenFridge, onClose } = this.props;
    const { email, error, sendDisabled } = this.state;

    return (
      <div className="UseShoppingListInStoreModal">
        <ModalHeader
          closeButton
          title="Take your list shopping"
          onHide={onClose}
        />

        <div className="UseShoppingListInStoreModal-form">
          {
            !hasItems &&
              <div className="UseShoppingListInStoreModal-noItemsWarning">
                Your list is empty.
              </div>
          }
          <div className="UseShoppingListInStoreModal-emailField">
            <div className="UseShoppingListInStoreModal-field">
              <Input
                autoFocus
                error={error}
                icon={iconAt}
                iconStyle={{ height: 16, width: 18 }}
                placeholder="Email"
                type="email"
                value={email}
                onChange={this.handleChange}
                onSubmit={this.handleSend}
              />
            </div>

            <Button
              className="UseShoppingListInStoreModal-fieldAction"
              disabled={sendDisabled}
              onClick={!sendDisabled && this.handleSend}
            >
              Send
            </Button>
          </div>

          {!isTizenFridge &&
            <div className="UseShoppingListInStoreModal-divider">
              <span className="UseShoppingListInStoreModal-dividerText">Or</span>
            </div>
          }

          {!isTizenFridge &&
            <div
              className="UseShoppingListInStoreModal-action"
              onClick={this.handlePrint}
            >
              <div className="UseShoppingListInStoreModal-action-iconContainer">
                <Icon
                  className="UseShoppingListInStoreModal-action-icon"
                  glyph={iconPrint}
                />
              </div>
              Print a handy checklist
            </div>
          }
        </div>
      </div>
    );
  }
}

UseShoppingListInStore.propTypes = {
  email: PropTypes.string,
  hasItems: PropTypes.bool.isRequired,
  isTizenFridge: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

UseShoppingListInStore.defaultProps = {
  email: '',
};

export default UseShoppingListInStore;
