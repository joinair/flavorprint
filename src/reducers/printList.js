
import assign from 'lodash/assign';

import createReducer from 'helpers/createReducer';

import {
  PRINT_LIST_EXTRA_LINES_SHOW,
  PRINT_LIST_EXTRA_LINES_HIDE,

  PRINT_LIST_FONT_SIZE_SMALL,
  PRINT_LIST_FONT_SIZE_LARGE,

  PRINT_LIST_KEY_SHOW,
  PRINT_LIST_KEY_HIDE,
} from 'actions/printList';

const initialState = {
  isExtraLinesVisible: true,
  isKeyVisible: true,
  isLarge: false,
};

const handlers = {
  [PRINT_LIST_EXTRA_LINES_SHOW]: state =>
    assign({}, state, { isExtraLinesVisible: true }),

  [PRINT_LIST_EXTRA_LINES_HIDE]: state =>
    assign({}, state, { isExtraLinesVisible: false }),

  [PRINT_LIST_KEY_SHOW]: state =>
    assign({}, state, { isKeyVisible: true }),

  [PRINT_LIST_KEY_HIDE]: state =>
    assign({}, state, { isKeyVisible: false }),

  [PRINT_LIST_FONT_SIZE_SMALL]: state =>
    assign({}, state, { isLarge: false }),

  [PRINT_LIST_FONT_SIZE_LARGE]: state =>
    assign({}, state, { isLarge: true }),
};

export default createReducer(initialState, handlers);
