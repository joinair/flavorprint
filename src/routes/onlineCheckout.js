
import assign from 'lodash/assign';
import get from 'lodash/get';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import Rx from 'rx';

import { ONLINE_CHECKOUT, HOME } from 'constants/Routes';
import { CHECKOUT_INVENTORY } from 'constants/QueryParams';

import onlineCheckout from 'actions/onlineCheckout';
import shoppingList from 'actions/shoppingList';

import initialLoad from 'helpers/initialLoad';
import { idToInventory, inventoryToId, hasInventory } from 'helpers/inventories';

import OnlineCheckout from 'components/pages/OnlineCheckout';

const redirectToInventory = (inventories, location, replace) => {
  const { query, pathname } = location;
  const inventory = idToInventory(get(query, CHECKOUT_INVENTORY));

  if (hasInventory(inventories, inventory)) {
    return undefined;
  }

  replace({
    pathname,
    query: assign(
      {},
      query,
      { [CHECKOUT_INVENTORY]: inventoryToId(inventories[0].inventory) }
    ),
  });
};

export default store => ({
  path: ONLINE_CHECKOUT,
  component: OnlineCheckout,
  analyticsTag: 'Online Checkout',

  onEnter(nextState, replace, callback) {
    const {
      user: { JWTHeader },
      inventories: { entries, isFetched },
    } = store.getState();

    if (!JWTHeader || isFetched && isEmpty(entries)) {
      replace({ pathname: HOME });
      callback();

      return undefined;
    }

    if (isFetched) {
      redirectToInventory(entries, nextState.location, replace);
      callback();

      return undefined;
    }

    const onSuccess = ({ inventories }) => {
      if (isEmpty(inventories)) {
        replace({ pathname: HOME });
      } else {
        redirectToInventory(inventories, nextState.location, replace);
      }

      callback();
    };

    const onError = () => {
      replace({ pathname: HOME });
      callback();
    };

    store.dispatch(onlineCheckout.loadInventories())
      .timeout(10000)
      .subscribe(onSuccess, onError);
  },

  prepareData({ query }) {
    if (!initialLoad()) {
      const id = get(query, CHECKOUT_INVENTORY);
      const inventory = idToInventory(id);

      const observables = [
        store.dispatch(onlineCheckout.loadItems(inventory)),
        store.dispatch(onlineCheckout.checkCredentials(id)),
        store.dispatch(shoppingList.loadOperations()),
      ];

      return Rx.Observable.from(observables).flatMap(identity);
    }
  },
});
