/* eslint no-loop-func:0, no-constant-condition: 0 */

import { put, take } from 'redux-saga/effects';

import { loadMark } from 'actions/user';

import {
  ONBOARDING_ANSWER_QUESTION_SUCCESS,
  ONBOARDING_SELECT_RECIPE_SUCCESS,
} from 'actions/onboarding';

const shouldLoadAct = ({ type }) =>
  type === ONBOARDING_ANSWER_QUESTION_SUCCESS ||
  type === ONBOARDING_SELECT_RECIPE_SUCCESS;

export default function* onboarding() {
  while (true) {
    const shouldLoad = yield take(shouldLoadAct);

    if (shouldLoad) {
      yield put(loadMark());
    }
  }
}
