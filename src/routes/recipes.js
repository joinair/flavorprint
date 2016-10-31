
import { RECIPES } from 'constants/Routes';

import { loadDetailedRecipes } from 'actions/recipes';

import initialLoad from 'helpers/initialLoad';

import Recipes from 'components/pages/Recipes';

export default store => ({
  path: RECIPES,
  component: Recipes,

  prepareData: () => {
    if (initialLoad()) { return undefined; }

    return store.dispatch(loadDetailedRecipes());
  },
});
