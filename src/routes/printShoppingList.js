
if (global.Platform.OS === 'node') {
  require.ensure = (_dependencies, callback) => callback(require);
}

import { PRINT_SHOPPING_LIST } from 'constants/Routes';

import shoppingList from 'actions/shoppingList';

export default store => ({
  path: PRINT_SHOPPING_LIST,

  getComponent(_location, cb) {
    require.ensure([], require => {
      cb(null, require('components/tmp/PrintShoppingList').default);
    });
  },

  prepareData() {
    if (global.Platform.OS !== 'node') { return undefined; }
    return store.dispatch(shoppingList.loadOperations());
  },
});
