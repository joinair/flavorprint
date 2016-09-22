/* eslint react/no-did-mount-set-state:0 */

import React, { Component, PropTypes } from 'react';

import {
  AUTHENTICATION,
  CHECKOUT_PROCESS,
  COOKBOOK_COLLECTIONS,
  DELETE_ACCOUNT,
  DELETE_RECIPE,
  FIND_ALTERNATIVES,
  ONBOARDING,
  REQUEST_RESET_PASSWORD,
  SEARCH,
  SEARCH_FILTERS,
  SEND_ITEMS_TO_INVENTORY,
  SEND_ITEMS_TO_PEAPOD,
  USE_SHOPPING_LIST_IN_STORE,
} from 'constants/Modals';

import assign from 'lodash/assign';
import get from 'lodash/get';

import './styles.css';

import Authentication from 'components/modals/Authentication';
import BodyClassName from 'components/ui-elements/BodyClassName';
import CheckoutProcess from 'components/modals/CheckoutProcess';
import CookbookCollections from 'components/modals/CookbookCollections';
import DeleteAccount from 'components/modals/DeleteAccount';
import DeleteRecipe from 'components/modals/DeleteRecipe';
import FindAlternatives from 'components/modals/FindAlternatives';
import Onboarding from 'components/modals/Onboarding';
import RequestResetPassword from 'components/modals/RequestResetPassword';
import Search from 'components/modals/Search';
import SearchFilters from 'components/modals/SearchFilters';
import SendItemsToInventory from 'components/modals/SendItemsToInventory';
import SendItemsToPeapod from 'components/modals/SendItemsToInventory/SendItemsToPeapod';
import UseShoppingListInStore from 'components/modals/UseShoppingListInStore';

const components = {
  [AUTHENTICATION]: Authentication,
  [COOKBOOK_COLLECTIONS]: CookbookCollections,
  [DELETE_ACCOUNT]: DeleteAccount,
  [DELETE_RECIPE]: DeleteRecipe,
  [ONBOARDING]: Onboarding,
  [REQUEST_RESET_PASSWORD]: RequestResetPassword,
  [SEARCH]: Search,
  [USE_SHOPPING_LIST_IN_STORE]: UseShoppingListInStore,
  [SEARCH_FILTERS]: SearchFilters,
  [SEND_ITEMS_TO_INVENTORY]: SendItemsToInventory,
  [SEND_ITEMS_TO_PEAPOD]: SendItemsToPeapod,
  [CHECKOUT_PROCESS]: CheckoutProcess,
  [FIND_ALTERNATIVES]: FindAlternatives,
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
