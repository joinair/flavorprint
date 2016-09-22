
import assign from 'lodash/assign';

import { formatKey } from 'helpers/cookies';
import createReducer from 'helpers/createReducer';
import handleRecipeSelection from 'helpers/handleRecipeSelection';

import { SHOPPING_LIST_VIEW } from 'constants/CookiesKeys';

import { RESTORE_FROM_COOKIES } from 'actions/cookies';

import {
  ADD_SHOPPING_LIST_ITEM,
  CHECK_SHOPPING_LIST_ITEM,
  EDIT_SHOPPING_LIST_ITEM,
  REMOVE_SHOPPING_LIST_ITEM,
  UNCHECK_SHOPPING_LIST_ITEM,

  CLEAR_SHOPPING_LIST_ITEMS,
  CLEAR_CHECKED_SHOPPING_LIST_ITEMS,

  ADD_SHOPPING_LIST_RECIPE,
  REMOVE_SHOPPING_LIST_RECIPE,

  LOAD_SHOPPING_LIST_OPERATIONS_REQUEST,
  LOAD_SHOPPING_LIST_OPERATIONS_SUCCESS,
  SEND_SHOPPING_LIST_OPERATIONS_REQUEST,
  SEND_SHOPPING_LIST_OPERATIONS_SUCCESS,
  RESTORE_SHOPPING_LIST_OPERATIONS,

  LOAD_SHOPPING_LIST_POPULAR_ITEMS_SUCCESS,

  CHANGE_SHOPPING_LIST_FILTER,

  SHOPPING_LIST_REMOTE_SOURCE,
  SHOPPING_LIST_LOCAL_SOURCE,
} from 'actions/shoppingList';

import {
  SIGN_UP_SUCCESS,
  LOG_IN_SUCCESS,

  LOG_OUT,
} from 'actions/user';

import { OAUTH_LOG_IN_SUCCESS } from 'actions/oauth';

import ShoppingListFilters from 'constants/ShoppingListFilters';

import addItem from './handlers/addItem';
import checkItem from './handlers/checkItem';
import editItem from './handlers/editItem';
import removeItem from './handlers/removeItem';
import uncheckItem from './handlers/uncheckItem';

import clearItems from './handlers/clearItems';
import clearCheckedItems from './handlers/clearCheckedItems';

import addRecipe from './handlers/addRecipe';
import removeRecipe from './handlers/removeRecipe';

import updateAfterSynchronization from './handlers/updateAfterSynchronization';
import restoreOperations from './handlers/restoreOperations';

import changeFilter from './handlers/changeFilter';

import changeRecipeSelection from './handlers/changeRecipeSelection';

import setLastSource from './handlers/setLastSource';

const initialState = {
  operationSyncId: undefined,
  sortBy: ShoppingListFilters.RECIPE,
  lastSource: SHOPPING_LIST_REMOTE_SOURCE,

  items: {},
  operations: [],
  recipes: {},
  popularItems: [],
};

const handlers = assign({
  [LOAD_SHOPPING_LIST_POPULAR_ITEMS_SUCCESS]: (state, action) =>
    assign({}, state, {
      popularItems: action.payload.products,
    }),

  [RESTORE_FROM_COOKIES]: (state, action) =>
    assign({}, state, {
      sortBy:
        action.payload[formatKey(SHOPPING_LIST_VIEW)] ||
        initialState.sortBy,
    }),

  [ADD_SHOPPING_LIST_ITEM]: addItem,
  [CHECK_SHOPPING_LIST_ITEM]: checkItem,
  [EDIT_SHOPPING_LIST_ITEM]: editItem,
  [REMOVE_SHOPPING_LIST_ITEM]: removeItem,
  [UNCHECK_SHOPPING_LIST_ITEM]: uncheckItem,

  [CLEAR_SHOPPING_LIST_ITEMS]: clearItems,
  [CLEAR_CHECKED_SHOPPING_LIST_ITEMS]: clearCheckedItems,

  [ADD_SHOPPING_LIST_RECIPE]: addRecipe,
  [REMOVE_SHOPPING_LIST_RECIPE]: removeRecipe,

  [LOAD_SHOPPING_LIST_OPERATIONS_REQUEST]: setLastSource(SHOPPING_LIST_REMOTE_SOURCE),
  [LOAD_SHOPPING_LIST_OPERATIONS_SUCCESS]: updateAfterSynchronization,
  [SEND_SHOPPING_LIST_OPERATIONS_REQUEST]: setLastSource(SHOPPING_LIST_LOCAL_SOURCE),
  [SEND_SHOPPING_LIST_OPERATIONS_SUCCESS]: updateAfterSynchronization,
  [RESTORE_SHOPPING_LIST_OPERATIONS]: restoreOperations,

  [CHANGE_SHOPPING_LIST_FILTER]: changeFilter,

  [SIGN_UP_SUCCESS]: () => initialState,
  [LOG_IN_SUCCESS]: () => initialState,
  [OAUTH_LOG_IN_SUCCESS]: () => initialState,
  [LOG_OUT]: () => initialState,
}, handleRecipeSelection(changeRecipeSelection));

export default createReducer(initialState, handlers);
