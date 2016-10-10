
import Rx from 'rx';

import filter from 'lodash/filter';
import identity from 'lodash/identity';
import map from 'lodash/map';

import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

import selectors from 'reducers/selectors';

export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';

export const LOAD_PRODUCTS_MORE_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_MORE_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_MORE_FAILURE = 'LOAD_PRODUCTS_FAILURE';

export const LOAD_PRODUCT_DETAILS_REQUEST = 'LOAD_PRODUCT_DETAILS_REQUEST';
export const LOAD_PRODUCT_DETAILS_SUCCESS = 'LOAD_PRODUCT_DETAILS_SUCCESS';
export const LOAD_PRODUCT_DETAILS_FAILURE = 'LOAD_PRODUCT_DETAILS_FAILURE';

export const loadProducts = (params = {}) => (dispatch, getState) => {
  const endpoint = '/v3/recommendations' +
    (params.userId ? `/${params.userId}` : '');
  const type = 'PRODUCT';
  const size = params.size || 12;
  const more = !!params.more;

  const ignore = map(
    selectors.getSortedProducts(getState()),
    x => x.itemId
  );

  return dispatch({
    [API_CALL]: {
      endpoint,
      query: { type, size, ignore },
      types: more ? [
        LOAD_PRODUCTS_MORE_REQUEST,
        LOAD_PRODUCTS_MORE_SUCCESS,
        LOAD_PRODUCTS_MORE_FAILURE,
      ] : [
        LOAD_PRODUCTS_REQUEST,
        LOAD_PRODUCTS_SUCCESS,
        LOAD_PRODUCTS_FAILURE,
      ],
    },
  });
};

export const loadDetails = product => product.detailUrl ? ({
  payload: { productId: product.itemId, product },

  [API_CALL]: {
    endpoint: '',
    url: product.detailUrl,
    types: [
      LOAD_PRODUCT_DETAILS_REQUEST,
      LOAD_PRODUCT_DETAILS_SUCCESS,
      LOAD_PRODUCT_DETAILS_FAILURE,
    ],
  },
}) : undefined;

export const loadDetailedProducts = params => ({
  [CHAIN]: [
    () => loadProducts(params),
    () => (dispatch, getState) => Rx.Observable.from(
      filter(map(
        selectors.getProducts(getState()),
        x => dispatch(loadDetails(x))
      ))
    ).flatMap(identity),
  ],
});


export default {
  loadProducts,
  loadDetails,
  loadDetailedProducts,
};
