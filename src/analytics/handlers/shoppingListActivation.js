
import mixpanel from 'analytics/mixpanel';

import countBy from 'lodash/countBy';
import isEmpty from 'lodash/isEmpty';

import { SEND_ONLINE_CHECKOUT_ITEMS_SUCCESS } from 'actions/onlineCheckout';
import { SEND_SHOPPING_LIST_REQUEST } from 'actions/shoppingList';
import { SHOPPING_LIST_PRINT } from 'constants/AnalyticsEventTypes';

const activationTypes = {
  [SEND_ONLINE_CHECKOUT_ITEMS_SUCCESS]: 'Online Checkout',
  [SEND_SHOPPING_LIST_REQUEST]: 'Email',
  [SHOPPING_LIST_PRINT]: 'Print',
};

const handler = (state, action) => {
  const counter = mixpanel.getProperty('Number of Shopping List Activations') | 0;
  const datetime = new Date().toISOString();

  const numberOfItems = countBy(state.shoppingList.items, ({ checked, unchecked }) =>
    !isEmpty(checked) || !isEmpty(unchecked)
  );

  mixpanel.register({
    'Date of Shopping List Activated': datetime,
    'Number of Shopping List Activations': counter + 1,
  });

  mixpanel.track('Activate Shopping List', state, {
    'Activation Type': activationTypes[action.type],
    'Number of Items': numberOfItems.true,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Date of Shopping List Activated': datetime });
    mixpanel.people.increment('Number of Shopping List Activations');
  }
};

export default ({ state, action }) => {
  if (
    action.type === SEND_ONLINE_CHECKOUT_ITEMS_SUCCESS ||
    action.type === SEND_SHOPPING_LIST_REQUEST ||
    action.type === SHOPPING_LIST_PRINT
  ) {
    handler(state, action);
  }
};
