
import buildREcommendationsReducer from './recommendations';

import {
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_MORE_SUCCESS,
  LOAD_PRODUCTS_FROM_CACHE,

  LOAD_PRODUCT_DETAILS_SUCCESS,
} from 'actions/products';

export default buildREcommendationsReducer({
  LOAD_DETAILS_SUCCESS: LOAD_PRODUCT_DETAILS_SUCCESS,
  LOAD_FROM_CACHE: LOAD_PRODUCTS_FROM_CACHE,
  LOAD_MORE_SUCCESS: LOAD_PRODUCTS_MORE_SUCCESS,
  LOAD_SUCCESS: LOAD_PRODUCTS_SUCCESS,

  idSelector: details => details.productId,
});
