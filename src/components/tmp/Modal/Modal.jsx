/* eslint react/no-did-mount-set-state:0 */

import React, { Component, PropTypes } from 'react';

import {
  AUTHENTICATION,
  DELETE_ACCOUNT,
  ONBOARDING,
  REQUEST_RESET_PASSWORD,
} from 'constants/Modals';

import assign from 'lodash/assign';
import get from 'lodash/get';

import './styles.css';

import Authentication from 'components/modals/Authentication';
import BodyClassName from 'components/ui-elements/BodyClassName';
import DeleteAccount from 'components/modals/DeleteAccount';
import Onboarding from 'components/modals/Onboarding';
import RequestResetPassword from 'components/modals/RequestResetPassword';

const components = {
  [AUTHENTICATION]: Authentication,
  [DELETE_ACCOUNT]: DeleteAccount,
  [ONBOARDING]: Onboarding,
  [REQUEST_RESET_PASSWORD]: RequestResetPassword,
};

const content = (modal, onModalClose) => {
  const { type, payload } = modal;

  const props = assign({}, payload, { onClose: onModalClose });
  const ModalComponent = components[type];

  if (ModalComponent) {
    return <ModalComponent {...props} />;
  }

  return false;
};

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    if (!this.state.mounted) { return false; }

    const { modal, onModalClose } = this.props;
    const { settings, type } = modal;

    const dimmer = !get(settings, 'dimmer.hidden') && (
      <div
        className="Modal-overlay"
        onClick={get(settings, 'dimmer.disabled') ? undefined : onModalClose}
      />
    );

    return type
      ? (
        <div className="Modal">
          <BodyClassName className="is-modalOpened" />

          {dimmer}

          <div className="Modal-container">
            {content(modal, onModalClose)}
          </div>
        </div>
      ) : null;
  }
}

Modal.propTypes = {
  modal: PropTypes.shape({
    type: PropTypes.string,
    payload: PropTypes.object,
    settings: PropTypes.shape({
      dimmer: PropTypes.shape({
        disabled: PropTypes.bool,
        hidden: PropTypes.bool,
      }),
    }),
  }).isRequired,

  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
