
import { connect } from 'react-redux';

import { FIND_ALTERNATIVES } from 'constants/Modals';

import modal from 'actions/modal';
import onlineCheckout from 'actions/onlineCheckout';

import OnlineCheckoutItem from './Item';

const actions = (dispatch, { item }) => ({
  onFind: () =>
    dispatch(modal.open(FIND_ALTERNATIVES, { itemId: item.id })),

  onSwap: () =>
    dispatch(modal.open(FIND_ALTERNATIVES, { itemId: item.id })),

  onQuantityChange: quantity =>
    dispatch(onlineCheckout.changeItemQuantity(item, quantity)),
});

export default connect(null, actions)(OnlineCheckoutItem);
