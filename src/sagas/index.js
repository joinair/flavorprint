
import { fork } from 'redux-saga/effects';

import authentication from './authentication';
import onboarding from './onboarding';

export default function* root() {
  yield [
    fork(authentication),
    fork(onboarding),
  ];
}
