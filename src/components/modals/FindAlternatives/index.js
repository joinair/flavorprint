
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import find from 'lodash/find';

import modal from 'actions/modal';
import onlineCheckout from 'actions/onlineCheckout';

import FindAlternatives from './FindAlternatives';

const selector = createStructuredSelector({
  item: (state, props) =>
    find(state.onlineCheckout.items, { id: props.itemId }),
});

const actions = {
  onLoad: onlineCheckout.loadItemOptions,
  onSearch: onlineCheckout.searchItemOptions,
  onOptionSelect: (item, option) => dispatch => {
    dispatch(onlineCheckout.selectItemOption(item, option));
    dispatch(modal.close());
  },
};

export default connect(selector, actions)(FindAlternatives);
