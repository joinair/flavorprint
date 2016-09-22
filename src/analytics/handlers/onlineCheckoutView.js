
import mixpanel from 'analytics/mixpanel';

import size from 'lodash/size';

import ShoppingListFilters from 'constants/ShoppingListFilters';

import {
  LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS,
} from 'actions/onlineCheckout';

const handler = state => {
  const datetime = new Date().toISOString();

  mixpanel.register({
    'Date of Last StoreItem List Viewed': datetime,
  });

  mixpanel.track('View StoreItem List', state, {
    'Inventory Name': state.onlineCheckout.inventory.name,
    'Inventory Region': state.onlineCheckout.inventory.region,
    'Number of Items': size(state.onlineCheckout.items),
    'List Grouping': state.shoppingList.sortBy === ShoppingListFilters.RECIPE
      ? 'Recipe'
      : 'Category',
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Date of Last StoreItem List Viewed': datetime });
  }
};

export default ({ state, action }) => {
  if (action.type === LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS) {
    handler(state);
  }
};
