
import identity from 'lodash/identity';
import Rx from 'rx';

import { platformPickLazy } from 'helpers/platformPick';

import { SHOPPING_LIST } from 'constants/Routes';

import onlineCheckout from 'actions/onlineCheckout';
import shoppingList from 'actions/shoppingList';

import ShoppingList from 'components/pages/ShoppingList';

export default store => ({
  path: SHOPPING_LIST,
  component: ShoppingList,
  analyticsTag: 'Shopping list',

  prepareData() {
    const state = store.getState();
    const observables = [];
    const { inventories } = state;

    platformPickLazy({
      mobile: () => {
        observables.push(store.dispatch(shoppingList.loadPopularItems()));
        observables.push(store.dispatch(shoppingList.loadOperations()));
      },

      node: () => {
        observables.push(store.dispatch(shoppingList.loadOperations()));
      },
    });

    if (!inventories.isFetched) {
      observables.push(store.dispatch(onlineCheckout.loadInventories()));
    }

    return Rx.Observable.from(observables).flatMap(identity);
  },
});
