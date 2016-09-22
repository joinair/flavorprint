
import { fork } from 'redux-saga/effects';

import authentication from './authentication';

export default function* root() {
  yield [
    fork(authentication),
  ];
}
