
import noop from 'lodash/noop';

import { PRODUCTS } from 'constants/Routes';

import { loadDetailedProducts } from 'actions/products';
import fetching from 'actions/fetching';

import initialLoad from 'helpers/initialLoad';

import Products from 'components/pages/Products';

export default store => ({
  path: PRODUCTS,
  component: Products,

  prepareData: () => {
    if (initialLoad()) { return undefined; }

    store.dispatch(fetching.start(fetching.GROUP_IDS.PRODUCTS));

    const result$ = store.dispatch(loadDetailedProducts());

    result$.subscribe(noop, noop, () => (
      store.dispatch(fetching.stop(fetching.GROUP_IDS.PRODUCTS))
    ));

    return result$;
  },
});