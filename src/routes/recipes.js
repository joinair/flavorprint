
import Rx from 'rx';

import { RECIPES } from 'constants/Routes';

import { loadDetailedRecipes } from 'actions/recipes';
import { loadInteractions } from 'actions/interactions';

import initialLoad from 'helpers/initialLoad';

import Recipes from 'components/pages/Recipes';

export default store => ({
  path: RECIPES,
  component: Recipes,

  prepareData: () => {
    if (initialLoad()) { return undefined; }

    return Rx.Observable.from([
      store.dispatch(loadDetailedRecipes()),
      store.dispatch(loadInteractions()),
    ]).flatMap(x => x);
  },
});
