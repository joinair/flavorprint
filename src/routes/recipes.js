
import noop from 'lodash/noop';

import { RECIPES } from 'constants/Routes';

import { loadDetailedRecipes } from 'actions/recipes';
import fetching from 'actions/fetching';

import selectors from 'reducers/selectors';

import initialLoad from 'helpers/initialLoad';

import Recipes from 'components/pages/Recipes';

export default store => ({
  path: RECIPES,
  component: Recipes,

  prepareData: () => {
    if (initialLoad()) { return undefined; }

    store.dispatch(fetching.start(fetching.GROUP_IDS.RECIPES));

    const userId = selectors.userIdSelector(store.getState());
    const result$ = store.dispatch(loadDetailedRecipes({ userId }));

    result$.subscribe(noop, noop, () => (
      store.dispatch(fetching.stop(fetching.GROUP_IDS.RECIPES))
    ));

    return result$;
  },
});
