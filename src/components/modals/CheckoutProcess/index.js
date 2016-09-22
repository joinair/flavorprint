
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import omit from 'lodash/omit';

import { HOME } from 'constants/Routes';
import { SEND_ITEMS_TO_INVENTORY, SEND_ITEMS_TO_PEAPOD } from 'constants/Modals';

import modal from 'actions/modal';
import router from 'actions/router';
import onlineCheckout from 'actions/onlineCheckout';

import CheckoutProcess from './CheckoutProcess';

const selector = createStructuredSelector({
  inventory: state => state.onlineCheckout.inventory,
});

const back = () => (dispatch, getState) => {
  const { query, state } = getState().router;

  return dispatch(
    router.replace(HOME, query, omit(state, 'modal'))
  );
};

const openAuthForm = () => (dispatch, getState) => {
  const inventory = getState().onlineCheckout.inventory;

  dispatch(
    modal.openWithReplacement(
      inventory.name === 'Peapod'
        ? SEND_ITEMS_TO_PEAPOD
        : SEND_ITEMS_TO_INVENTORY,
      { error: true }
    )
  );
};

const actions = {
  onSend: onlineCheckout.sendItems,
  onSendFailure: openAuthForm,
  onBack: back,
};

export default connect(selector, actions)(CheckoutProcess);
