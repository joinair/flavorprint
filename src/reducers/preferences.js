
import createReducer from 'helpers/createReducer';

import { LOAD_PREFERENCES_SUCCESS } from 'actions/preferences';

const initialState = {
  isFetched: false,

  categories: {
    allergies: [],
    diets: [],
    difficulty: [],
    dislikedProducts: [],
    inventories: [],
    recipes: [],
  },
};

const handlers = {
  [LOAD_PREFERENCES_SUCCESS]: (state_, action) => ({
    isFetched: true,
    categories: action.payload,
  }),
};

export default createReducer(initialState, handlers);
