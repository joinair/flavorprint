
import map from 'lodash/map';

export const getProducts = state =>
  state.products.entries;

export const getSortedProducts = state =>
  map(state.products.entriesOrder, id => state.products.entries[id]);

export const canLoadMoreProducts = () =>
  false;

export default {
  getProducts,
  getSortedProducts,
  canLoadMoreProducts,
};
