
import { PRODUCTS } from 'constants/Routes';

import { loadDetailedProducts } from 'actions/products';

import Products from 'components/pages/Products';

export default store => ({
  path: PRODUCTS,
  component: Products,

  prepareData: () => {
    store.dispatch(loadDetailedProducts());
  },
});
