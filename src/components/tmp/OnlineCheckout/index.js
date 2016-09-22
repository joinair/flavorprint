
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import get from 'lodash/get';
import omit from 'lodash/omit';

import { CHECKOUT_INVENTORY, REDIRECT_PATH } from 'constants/QueryParams';

import router from 'actions/router';
import { changeFilter } from 'actions/shoppingList';

import OnlineCheckout from './OnlineCheckout';

const querySelector = state => get(state, 'router.location.query', {});
const viewSelector = state => state.shoppingList.sortBy;

const onlineCheckoutSelector = createStructuredSelector({
  query: querySelector,
  view: viewSelector,
});

const actions = dispatch => ({
  onClose: query => () => {
    const redirectPath = get(query, REDIRECT_PATH, '/');

    dispatch(router.push(
      redirectPath,
      omit(query, CHECKOUT_INVENTORY, REDIRECT_PATH)
    ));
  },

  onViewChange: view => dispatch(changeFilter(view)),
});

const mergeProps = (stateProps, actionsProps, props) =>
  assign({}, props,
    omit(stateProps, 'query'),
    actionsProps,
    { onClose: actionsProps.onClose(stateProps.query) }
  );

export default connect(onlineCheckoutSelector, actions, mergeProps)(OnlineCheckout);
