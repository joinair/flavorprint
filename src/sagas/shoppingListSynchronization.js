/* eslint no-loop-func:0 */

import { put, race, select, take } from 'redux-saga/effects';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Rx from 'rx';

import storage from 'helpers/storage';

import { ROUTER_DID_CHANGE } from 'actions/router';
import { OPEN_SHOPPING_LIST_SIDEBAR } from 'actions/shoppingListSidebar';

import {
  REQUIRE_SHOPPING_LIST_SYNCHRONIZATION,
  loadOperations, sendOperations,
} from 'actions/shoppingList';

import { SHOPPING_LIST_OPERATIONS } from 'constants/LocalStorageKeys';

const shouldStartSynchronization = action =>
  action.type === OPEN_SHOPPING_LIST_SIDEBAR ||
  action.type === ROUTER_DID_CHANGE &&
    !action.payload.synthetic &&
    get(action, 'payload.location.pathname') === '/shopping-list' ||
  get(action, `meta.${REQUIRE_SHOPPING_LIST_SYNCHRONIZATION}`);

const shouldStopSynchronization = state =>
  !(
    state.shoppingListSidebar.isOpen ||
    get(state, 'router.location.pathname') === '/shopping-list' ||
    !isEmpty(state.shoppingList.operations)
  );

function* shoppingListSynchronization() {
  while (yield take(shouldStartSynchronization)) {
    do {
      const state = yield select();
      const { shoppingList } = state;
      const { operations } = shoppingList;

      const action = isEmpty(operations)
        ? loadOperations()
        : sendOperations();

      (yield put(action)).subscribe(
        () => storage.set(SHOPPING_LIST_OPERATIONS, '[]'),
        () => storage.set(
          SHOPPING_LIST_OPERATIONS,
          JSON.stringify(operations)
        )
      );

      yield race({
        newChange: take(shouldStartSynchronization),
        timeout: Rx.Observable.interval(5000).take(1).toPromise(),
      });
    } while (!shouldStopSynchronization((yield select())));
  }
}

export default shoppingListSynchronization;
