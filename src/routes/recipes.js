
import { RECIPES } from 'constants/Routes';

import { loadDetailedRecipes } from 'actions/recipes';

import Recipes from 'components/pages/Recipes';

export default store => ({
  path: RECIPES,
  component: Recipes,

  prepareData: () => {
    store.dispatch(loadDetailedRecipes());
  },
});
