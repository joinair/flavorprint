
import { fork } from 'redux-saga/effects';

import shoppingListSynchronization from './shoppingListSynchronization';
import authentication from './authentication';

export default function* root() {
  yield [
    fork(authentication),
    fork(shoppingListSynchronization),
  ];
}
