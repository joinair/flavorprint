
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import get from 'lodash/get';
import omit from 'lodash/omit';

import { CHECKOUT_INVENTORY } from 'constants/QueryParams';

import router from 'actions/router';

import Inventories from './Inventories';

const activeSelector = state => state.onlineCheckout.inventory;
const inventoriesSelector = state => state.inventories.entries;
const querySelector = state => get(state, 'router.location.query', {});

const propsSelector = createStructuredSelector({
  active: activeSelector,
  inventories: inventoriesSelector,
  query: querySelector,
});

const actions = dispatch => ({
  onInventoryChange: query => id => {
    dispatch(router.push(null, assign(
      {},
      query,
      { [CHECKOUT_INVENTORY]: id }
    )));
  },
});

const mergeProps = (stateProps, actionsProps, props) =>
  assign({}, props,
    omit(stateProps, 'query'),
    actionsProps,
    { onInventoryChange: actionsProps.onInventoryChange(stateProps.query) }
  );

export default connect(propsSelector, actions, mergeProps)(Inventories);
