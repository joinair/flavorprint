
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';

import { inventoryToId } from 'helpers/inventories';

import { CHECKOUT_INVENTORY, REDIRECT_PATH } from 'constants/QueryParams';
import { ONLINE_CHECKOUT } from 'constants/Routes';

import router from 'actions/router';

import StoreDropdown from './StoreDropdown';

const selector = createStructuredSelector({
  inventories: state => state.inventories.entries,
});

const getBranchForInventory = (store, inventory) =>
  inventory.name === 'Peapod'
    ? store.peapod.config.priceZone
    : inventory.branch;

const actions = {
  onCheckout: inventory => (dispatch, getState) => {
    const store = getState();
    const { query, pathname } = store.router.location;

    const localInventory = assign({}, inventory.inventory, {
      branch: getBranchForInventory(store, inventory.inventory),
    });

    dispatch(router.push(
      ONLINE_CHECKOUT,
      assign({
        [CHECKOUT_INVENTORY]: inventoryToId(localInventory),
        [REDIRECT_PATH]: pathname,
      }, query)
    ));
  },
};

export default connect(selector, actions)(StoreDropdown);
