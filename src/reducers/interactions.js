
import find from 'lodash/find';

import createReducer from 'helpers/createReducer';

import { LOAD_INTERACTIONS_SUCCESS } from 'actions/interactions';
import {
  LIKE_RECIPE_SUCCESS,
  DISLIKE_RECIPE_SUCCESS,
} from 'actions/recipe';

const initialState = {
  entities: [],
};

const handlers = {
  [LOAD_INTERACTIONS_SUCCESS]: (state, { payload }) => ({
    ...state,
    entities: payload.content,
    totalElements: payload.totalElements,
  }),

  [LIKE_RECIPE_SUCCESS]: (state, { payload }) =>
    find(state.entities, { id: payload.id }) ? state : {
      ...state,
      entities: [...state.entities, payload],
      totalElements: state.totalElements + 1,
    },

  [DISLIKE_RECIPE_SUCCESS]: (state, { payload }) =>
    find(state.entities, { id: payload.id }) ? state : {
      ...state,
      entities: [...state.entities, payload],
      totalElements: state.totalElements + 1,
    },
};

export default createReducer(initialState, handlers);
