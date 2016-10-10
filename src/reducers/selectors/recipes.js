
import map from 'lodash/map';

export const getRecipes = state =>
  state.recipes.entries;

export const getSortedRecipes = state =>
  map(state.recipes.entriesOrder, id => state.recipes.entries[id]);

export const canLoadMoreRecipes = state =>
  state.recipes.canRequestNext;

export default {
  getRecipes,
  getSortedRecipes,
  canLoadMoreRecipes,
};
