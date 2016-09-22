
import assign from 'lodash/assign';
import get from 'lodash/get';
import map from 'lodash/map';
import partialRight from 'lodash/partialRight';

import createReducer from 'helpers/createReducer';
import handleRecipeSelection, { matchRecipe } from 'helpers/handleRecipeSelection';

import {
  FEED_CLEAN,

  LOAD_FEED_REQUEST,
  LOAD_FEED_SUCCESS,
  LOAD_FEED_FAILURE,

  LOAD_NEXT_FEED_PAGE_REQUEST,
  LOAD_NEXT_FEED_PAGE_SUCCESS,
} from 'actions/feed';

const initialState = {
  isErrored: false,
  context: null,
  recipes: [],
  paging: {
    offset: 0,
    total: 0,
  },
  facetsHits: {},
};

const signature = partialRight(get, 'meta.signature');

const updateRecipe = (state, action, extra = {}) => {
  const id = get(action, 'payload.id');
  const url = get(action, 'payload.externalUrl');

  if (!(id || url)) { return state; }

  const recipes = map(state.recipes, recipe =>
    matchRecipe(recipe, id, url)
      ? assign({}, recipe, extra)
      : recipe);

  return assign({}, state, { recipes });
};

const initialStateWithFacets = ({ facetsHits }) => {
  const facets = facetsHits ? { facetsHits } : {};
  return assign({}, initialState, facets);
};

const handlers = assign({
  [FEED_CLEAN]: (state, action) =>
    assign({}, initialStateWithFacets(state), { meta: { signature: signature(action) } }),

  [LOAD_FEED_REQUEST]: (state, action) =>
    assign({}, initialStateWithFacets(state), { meta: { signature: signature(action) } }),

  [LOAD_NEXT_FEED_PAGE_REQUEST]: (state, action) =>
    assign({}, state, { meta: { signature: signature(action) } }),

  [LOAD_FEED_SUCCESS]: (state, action) =>
    signature(state) === signature(action)
      ? assign(
        {},
        initialState,
        {
          context: action.payload.context,
          cursorId: action.payload.cursorId,
          paging: action.payload.paging,
          recipes: action.payload.values,
          facetsHits: get(action.payload, 'facetsHits', {}),
        }
      )
      : state,

  [LOAD_NEXT_FEED_PAGE_SUCCESS]: (state, action) =>
    signature(state) === signature(action)
      ? assign(
        {},
        initialStateWithFacets(state),
        {
          context: state.context,
          cursorId: action.payload.cursorId || state.cursorId,
          paging: action.payload.paging,
          recipes: state.recipes.concat(action.payload.values),
        }
      )
      : state,

  [LOAD_FEED_FAILURE]: (state, action) =>
    signature(state) === signature(action)
      ? assign({}, state, { isErrored: true })
      : state,

}, handleRecipeSelection(updateRecipe));

export default createReducer(initialState, handlers);
