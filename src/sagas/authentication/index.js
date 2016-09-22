/* eslint no-loop-func:0, no-constant-condition: 0 */

import { put, race, select, take } from 'redux-saga/effects';

import assign from 'lodash/assign';
import get from 'lodash/get';
import omit from 'lodash/omit';

import { AUTHENTICATION } from 'constants/Modals';
import { UNAUTHENTICATED } from 'middleware/authentication';

import modal from 'actions/modal';
import router, { ROUTER_DID_CHANGE } from 'actions/router';

import {
  LOG_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  BECOME_USER_SUCCESS,
} from 'actions/user';

import { OAUTH_LOG_IN_SUCCESS } from 'actions/oauth';

const isModalOpen = ({ payload, type }) =>
  type === ROUTER_DID_CHANGE &&
  get(payload.location, 'state.modal.type') === AUTHENTICATION;

const isModalClosed = ({ payload, type }) =>
  type === ROUTER_DID_CHANGE &&
  get(payload.location, 'state.modal.type') !== AUTHENTICATION;

function* auth() {
  while (true) {
    const { action } = yield race({
      action: take(UNAUTHENTICATED),
      authModal: take(isModalOpen),
    });

    if (action) {
      yield put(modal.open(AUTHENTICATION, { selectedTab: 'Log in' }));
    }

    const { cancel } = yield race({
      cancel: take(isModalClosed),
      success: take([
        LOG_IN_SUCCESS,
        SIGN_UP_SUCCESS,
        BECOME_USER_SUCCESS,
        OAUTH_LOG_IN_SUCCESS,
      ]),
    });

    if (cancel) { continue; }

    const { pathname, state, query } = (yield select()).router.location;

    yield put(
      router.replace(
        pathname,
        query,
        assign({ forceReload: AUTHENTICATION }, omit(state, 'modal'))
      )
    );

    if (action) {
      yield put(action.payload);
    }
  }
}

export default auth;
