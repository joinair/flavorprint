
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import find from 'lodash/find';

import { ONLINE_CHECKOUT } from 'constants/Routes';
import { CHECKOUT_PROCESS } from 'constants/Modals';

import modal from 'actions/modal';
import peapod from 'actions/peapod';
import router from 'actions/router';

import SendItemsToPeapod from './SendItemsToPeapod';

const createAccountHrefSelector = ({ inventories }) => {
  const inventory = find(inventories.entries, x => x.inventory.name === 'Peapod');
  return inventory ? inventory.signupUrl : '';
};

const hasCredentialsSelector = state =>
  state.peapod.isValid && state.onlineCheckout.hasCredentials;

const regionConfigSelector = state => ({
  config: state.peapod.config,
  pendingConfig: state.peapod.pendingConfig,
  isConflicting: !!state.peapod.pendingConfig,
});

const selector = createStructuredSelector({
  createAccountHref: createAccountHrefSelector,
  hasCredentials: hasCredentialsSelector,
  regionConfig: regionConfigSelector,
});

const sendItems = () =>
  modal.openWithReplacement(CHECKOUT_PROCESS, null, {
    dimmer: { hidden: true },
  });

const changeZip = () => (dispatch, getState) => {
  const state = getState();
  const { config, pendingConfig } = state.peapod;
  const { region, name } = state.onlineCheckout.inventory;
  const { query } = state.router.location;

  dispatch(peapod.commitConfig());

  if (config.priceZone !== pendingConfig.priceZone) {
    dispatch(router.replace(ONLINE_CHECKOUT, assign({}, query, {
      shop: `${region}:${name}:${pendingConfig.priceZone}`,
    })));
  }
};

const actions = {
  onLogin: peapod.logIn,
  onSend: sendItems,
  onChangeZip: changeZip,
};

export default connect(selector, actions)(SendItemsToPeapod);
