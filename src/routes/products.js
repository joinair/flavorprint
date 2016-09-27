
import { PRODUCTS } from 'constants/Routes';

import { loadDetailedProducts } from 'actions/products';

import initialLoad from 'helpers/initialLoad';

import Products from 'components/pages/Products';

export default store => ({
  path: PRODUCTS,
  component: Products,

  prepareData: () => {
    if (initialLoad()) { return undefined; }
    return store.dispatch(loadDetailedProducts());
  },
});
