
import assign from 'lodash/assign';
import map from 'lodash/map';

import createReducer from 'helpers/createReducer';
import { normalizeEntities } from 'helpers/reducer';

export default function buildREcommendationsReducer({
  LOAD_DETAILS_SUCCESS,
  LOAD_FROM_CACHE,
  LOAD_MORE_SUCCESS,
  LOAD_SUCCESS,

  idSelector,
  extraHandlers,
}) {
  const initialState = {
    paginationCache: [],
    entries: {},
    entriesOrder: [],
  };

  const handlers = assign({
    [LOAD_SUCCESS]: (state, action) => {
      const cacheFrom = +action.meta.cacheFrom;
      const display = action.payload.slice(0, cacheFrom);
      const cache = action.payload.slice(cacheFrom);

      return {
        paginationCache: cache,
        entriesOrder: map(display, 'itemId'),
        entries: normalizeEntities(display),
      };
    },

    [LOAD_FROM_CACHE]: (state, action) => {
      const display = state.paginationCache.slice(0, action.payload.size);
      const cache = state.paginationCache.slice(action.payload.size);

      return {
        paginationCache: cache,
        entriesOrder: [...state.entriesOrder, ...map(display, 'itemId')],
        entries: { ...state.entries, ...normalizeEntities(display) },
      };
    },

    [LOAD_MORE_SUCCESS]: (state, action) => {
      const cacheFrom = +action.meta.cacheFrom;
      const display = action.payload.slice(0, cacheFrom);
      const cache = action.payload.slice(cacheFrom);

      return {
        paginationCache: [...state.paginationCache, ...cache],
        entriesOrder: [...state.entriesOrder, ...map(display, 'itemId')],
        entries: { ...state.entries, ...normalizeEntities(display) },
      };
    },

    [LOAD_DETAILS_SUCCESS]: (state, { payload }) => ({
      ...state,
      entries: {
        ...state.entries,
        [idSelector(payload)]: {
          ...state.entries[idSelector(payload)],
          details: payload,
        },
      },
    }),

    ...extraHandlers,
  });

  return createReducer(initialState, handlers);
}
