
import Rx from 'rx';

import identity from 'lodash/identity';
import map from 'lodash/map';
import noop from 'lodash/noop';

import { API_CALL } from 'middleware/API';

import selectors from 'reducers/selectors';

import { CONTEXT, LIMIT } from './feed';

export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';

export const LOAD_PRODUCT_DETAILS_REQUEST = 'LOAD_PRODUCT_DETAILS_REQUEST';
export const LOAD_PRODUCT_DETAILS_SUCCESS = 'LOAD_PRODUCT_DETAILS_SUCCESS';
export const LOAD_PRODUCT_DETAILS_FAILURE = 'LOAD_PRODUCT_DETAILS_FAILURE';

export const loadProducts = (params = {}) => {
  const endpoint = '/v3/recommendations';
  const type = 'PRODUCT';
  const size = params.size || LIMIT;

  return {
    payload: { context: CONTEXT.FEED },

    [API_CALL]: {
      endpoint,
      query: { type, size },
      types: [
        LOAD_PRODUCTS_REQUEST,
        LOAD_PRODUCTS_SUCCESS,
        LOAD_PRODUCTS_FAILURE,
      ],
    },
  };
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

export const loadDetailedProducts = params => (dispatch, getState) => {
  const subject = new Rx.Subject();
  const products$ = dispatch(loadProducts(params));

  products$.subscribe(noop, noop, () => {
    const details$ = Rx.Observable.from(
      map(
        selectors.getProducts(getState()),
        x => dispatch(loadDetails(x))
      )
    ).flatMap(identity);

    details$.subscribe(noop, noop, subject.onCompleted);
  });

  return subject;
};

export default {
  loadProducts,
  loadDetails,
  loadDetailedProducts,
};
