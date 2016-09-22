
import { HIDE_NOT_FOUND, SHOW_NOT_FOUND } from 'actions/notFound';

import createReducer from 'helpers/createReducer';

const initialState = false;

const handlers = {
  [HIDE_NOT_FOUND]: () => false,
  [SHOW_NOT_FOUND]: () => true,
};

export default createReducer(initialState, handlers);
