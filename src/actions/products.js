
import selectors from 'reducers/selectors';

import buildRecommendationsActions from './recommendations';

export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';

export const LOAD_PRODUCTS_MORE_REQUEST = 'LOAD_PRODUCTS_MORE_REQUEST';
export const LOAD_PRODUCTS_MORE_SUCCESS = 'LOAD_PRODUCTS_MORE_SUCCESS';
export const LOAD_PRODUCTS_MORE_FAILURE = 'LOAD_PRODUCTS_MORE_FAILURE';

export const LOAD_PRODUCTS_FROM_CACHE = 'LOAD_PRODUCTS_FROM_CACHE';

export const LOAD_PRODUCT_DETAILS_REQUEST = 'LOAD_PRODUCT_DETAILS_REQUEST';
export const LOAD_PRODUCT_DETAILS_SUCCESS = 'LOAD_PRODUCT_DETAILS_SUCCESS';
export const LOAD_PRODUCT_DETAILS_FAILURE = 'LOAD_PRODUCT_DETAILS_FAILURE';

export const LOAD_PRODUCTS_COMPATIBILITIES_REQUEST =
  'LOAD_PRODUCTS_COMPATIBILITIES_REQUEST';
export const LOAD_PRODUCTS_COMPATIBILITIES_SUCCESS =
  'LOAD_PRODUCTS_COMPATIBILITIES_SUCCESS';
export const LOAD_PRODUCTS_COMPATIBILITIES_FAILURE =
  'LOAD_PRODUCTS_COMPATIBILITIES_FAILURE';

const productsActions = buildRecommendationsActions({
  LOAD_REQUEST: LOAD_PRODUCTS_REQUEST,
  LOAD_SUCCESS: LOAD_PRODUCTS_SUCCESS,
  LOAD_FAILURE: LOAD_PRODUCTS_FAILURE,
  LOAD_MORE_REQUEST: LOAD_PRODUCTS_MORE_REQUEST,
  LOAD_MORE_SUCCESS: LOAD_PRODUCTS_MORE_SUCCESS,
  LOAD_MORE_FAILURE: LOAD_PRODUCTS_MORE_FAILURE,
  LOAD_FROM_CACHE: LOAD_PRODUCTS_FROM_CACHE,
  LOAD_DETAILS_REQUEST: LOAD_PRODUCT_DETAILS_REQUEST,
  LOAD_DETAILS_SUCCESS: LOAD_PRODUCT_DETAILS_SUCCESS,
  LOAD_DETAILS_FAILURE: LOAD_PRODUCT_DETAILS_FAILURE,

  recommendationsSelector: selectors.getSortedProducts,
  cacheSelector: state => state.products.paginationCache,
  type: 'PRODUCT',
});

export const loadProducts = productsActions.load;
export const loadProductDetails = productsActions.loadDetails;
export const loadDetailedProducts = productsActions.loadDetailed;

export default {
  loadProducts,
  loadProductDetails,
  loadDetailedProducts,
};
