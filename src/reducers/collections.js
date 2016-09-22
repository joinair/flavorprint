
import assign from 'lodash/assign';
import difference from 'lodash/difference';
import includes from 'lodash/includes';
import map from 'lodash/map';
import reject from 'lodash/reject';

import createReducer from 'helpers/createReducer';

import {
  LOAD_COLLECTIONS_SUCCESS,
  LOAD_COLLECTIONS_FAILURE,

  SAVE_COLLECTION_REQUEST,
  SAVE_COLLECTION_SUCCESS,
  SAVE_COLLECTION_FAILURE,

  DESTROY_COLLECTION_REQUEST,
} from 'actions/collections';

import {
  SELECT_RECIPE_REQUEST,
  SELECT_RECIPE_FAILURE,

  DESELECT_RECIPE_REQUEST,
  DESELECT_RECIPE_FAILURE,

  UPDATE_RECIPE_COLLECTIONS_REQUEST,
  UPDATE_RECIPE_COLLECTIONS_FAILURE,
} from 'actions/recipes';

import { LOG_OUT } from 'actions/user';

const initialState = {
  isFetched: false,
  isErrored: false,

  entries: [],
  numRecipes: 0,
};

const updateCollection = (state, action) => {
  const entries = map(state.entries, collection =>
    ((collection.id && collection.id === action.payload.id) ||
     (collection._cid && collection._cid === action.payload._cid))
     ? assign({}, collection, action.payload)
     : collection);

  return assign({}, state, { entries });
};

const updateNumRecipes = add => state =>
  assign({}, state, { numRecipes: state.numRecipes + (add ? 1 : -1) });

const updateCollectionsNumRecipes = (state, prevIds, nextIds) => {
  const idsToIncrease = difference(nextIds, prevIds);
  const idsToDecrease = difference(prevIds, nextIds);

  const entries = map(state.entries, collection => {
    if (includes(idsToIncrease, collection.id)) {
      return assign({}, collection,
        { numRecipes: collection.numRecipes + 1 });
    }

    if (includes(idsToDecrease, collection.id)) {
      return assign({}, collection,
        { numRecipes: collection.numRecipes - 1 });
    }

    return collection;
  });

  return assign({}, state, { entries });
};

const handlers = {
  [LOAD_COLLECTIONS_SUCCESS]: (state, action) =>
    assign(
      {},
      initialState,
      {
        isFetched: true,
        entries: action.payload.values,
        numRecipes: action.payload.numRecipes | 0,
      }
    ),

  [LOAD_COLLECTIONS_FAILURE]: state =>
    assign({}, state, { isErrored: true }),

  [SAVE_COLLECTION_REQUEST]: (state, action) =>
    action.payload._cid
      ? assign({}, state, {
        entries: [assign({ numRecipes: 0 }, action.payload), ...state.entries],
      })
      : updateCollection(state, action),

  [SAVE_COLLECTION_SUCCESS]: updateCollection,

  [SAVE_COLLECTION_FAILURE]: (state, action) =>
    action.payload._cid
      ? assign(
          {},
          state,
          { entries: reject(state.entries, { _cid: action.payload._cid }) }
        )
      : updateCollection(state, action),

  [DESTROY_COLLECTION_REQUEST]: (state, action) =>
    assign(
      {},
      state,
      { entries: reject(state.entries, { id: action.payload.id }) }
    ),

  [LOG_OUT]: () => initialState,

  [SELECT_RECIPE_REQUEST]: updateNumRecipes(true),
  [SELECT_RECIPE_FAILURE]: updateNumRecipes(false),

  [DESELECT_RECIPE_REQUEST]: (state, action) =>
    updateCollectionsNumRecipes(
      updateNumRecipes(false)(state),
      action.meta.previous.cookbook.collectionIds,
      []
    ),

  [DESELECT_RECIPE_FAILURE]: (state, action) =>
    updateCollectionsNumRecipes(
      updateNumRecipes(true)(state),
      [],
      action.meta.previous.cookbook.collectionIds
    ),

  [UPDATE_RECIPE_COLLECTIONS_REQUEST]: (state, action) =>
    updateCollectionsNumRecipes(
      state,
      action.meta.previous.cookbook.collectionIds,
      action.payload.cookbook.collectionIds
    ),

  [UPDATE_RECIPE_COLLECTIONS_FAILURE]: (state, action) =>
    updateCollectionsNumRecipes(
      state,
      action.payload.cookbook.collectionIds,
      action.meta.previous.cookbook.collectionIds
    ),
};

export default createReducer(initialState, handlers);
