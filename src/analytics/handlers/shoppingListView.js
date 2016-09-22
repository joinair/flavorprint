
import mixpanel from 'analytics/mixpanel';

import noop from 'lodash/noop';
import size from 'lodash/size';

import Rx from 'rx';

import ShoppingListFilters from 'constants/ShoppingListFilters';

import { ROUTER_DID_CHANGE } from 'actions/router';
import { LOAD_SHOPPING_LIST_OPERATIONS_SUCCESS } from 'actions/shoppingList';
import { OPEN_SHOPPING_LIST_SIDEBAR } from 'actions/shoppingListSidebar';

import getOrigin from 'analytics/helpers/getOrigin';
import platformPick from 'helpers/platformPick';

const handler = ({ state }) => {
  const datetime = new Date().toISOString();
  const origin = getOrigin(state);

  mixpanel.register({
    'Date of Shopping List Viewed': datetime,
  });

  mixpanel.track('View Shopping List', state, {
    'Number of Items': size(state.shoppingList.items),
    'List Grouping': state.shoppingList.sortBy === ShoppingListFilters.RECIPE
      ? 'Recipe'
      : 'Category',
    'Viewed From': origin,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Date of Shopping List Viewed': datetime });
    mixpanel.people.increment('Number of Shopping List Viewed');
  }
};

export default actions$ => {
  const waitForOperations = ({ state }) =>
    actions$
      .filter(({ action }) =>
        action.type === LOAD_SHOPPING_LIST_OPERATIONS_SUCCESS)
      .take(1)
      .timeout(5000, Rx.Observable.just({ state }));

  actions$
    .filter(platformPick({
      mobile: ({ action }) => action.type === OPEN_SHOPPING_LIST_SIDEBAR,

      default: ({ action }) =>
        (action.type === OPEN_SHOPPING_LIST_SIDEBAR) ||
        (action.type === ROUTER_DID_CHANGE &&
         !action.payload.synthetic &&
         action.payload.location.pathname === '/shopping-list'),
    }))
    .flatMap(waitForOperations)
    .subscribe(handler, noop);
};
