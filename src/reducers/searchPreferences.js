
import createReducer from 'helpers/createReducer';

import { LOAD_SEARCH_PREFERENCES_SUCCESS } from 'actions/preferences';

const initialState = {
  isFetched: false,

  categories: {
    diets: [],
    allergies: [],
    mealTypes: [],
  },
};

const handlers = {
  [LOAD_SEARCH_PREFERENCES_SUCCESS]: (state, action) => ({
    isFetched: true,
    categories: action.payload,
  }),
};

export default createReducer(initialState, handlers);
