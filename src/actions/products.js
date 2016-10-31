
import {
  loadRecommendations,
  loadDetails,
  loadDetailedRecommendations,
} from './recommendations';

import fetching from 'actions/fetching';

export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';

export const LOAD_PRODUCT_DETAILS_REQUEST = 'LOAD_PRODUCT_DETAILS_REQUEST';
export const LOAD_PRODUCT_DETAILS_SUCCESS = 'LOAD_PRODUCT_DETAILS_SUCCESS';
export const LOAD_PRODUCT_DETAILS_FAILURE = 'LOAD_PRODUCT_DETAILS_FAILURE';

export const loadProducts = params => loadRecommendations([
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
])({ ...params, type: 'PRODUCT' });

export const loadProductDetails = loadDetails([
  LOAD_PRODUCT_DETAILS_REQUEST,
  LOAD_PRODUCT_DETAILS_SUCCESS,
  LOAD_PRODUCT_DETAILS_FAILURE,
]);

export const loadDetailedProducts = loadDetailedRecommendations(
  loadProducts,
  loadProductDetails,
  fetching.GROUP_IDS.PRODUCTS
);

export default {
  loadProducts,
  loadProductDetails,
  loadDetailedProducts,
};
