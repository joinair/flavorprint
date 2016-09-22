
if (global.Platform.OS === 'node') {
  require.ensure = (_dependencies, callback) => callback(require);
}

import Rx from 'rx';

import get from 'lodash/get';

import { PRINT_RECIPE, RECIPE_FEED } from 'constants/Routes';
import { RECIPE_ID, RECIPE_URL } from 'constants/QueryParams';

import recipe from 'actions/recipe';

export default store => ({
  path: PRINT_RECIPE,

  getComponent(_location, cb) {
    require.ensure([], require => {
      cb(null, require('components/pages/PrintRecipe').default);
    });
  },

  onEnter(nextState, replace) {
    const query = get(nextState, 'location.query', {});

    if (!query[RECIPE_ID] && !query[RECIPE_URL]) {
      replace(RECIPE_FEED);
    }
  },

  prepareData({ query }) {
    if (global.Platform.OS !== 'node') {
      return undefined;
    }

    const id = get(query, RECIPE_ID);
    const url = get(query, RECIPE_URL);

    if (id) {
      return store.dispatch(recipe.load(id));
    }

    if (url) {
      return store.dispatch(recipe.loadFromPartners(url));
    }

    return Rx.Observable.empty();
  },
});
