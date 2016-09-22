
import createReducer from 'helpers/createReducer';

import assign from 'lodash/assign';

import { formatKey } from 'helpers/cookies';

import { PEAPOD_CONFIG } from 'constants/CookiesKeys';

import { RESTORE_FROM_COOKIES } from 'actions/cookies';

import {
  PEAPOD_CHANGE_ZIP,
  PEAPOD_COMMIT_CONFIG,
  PEAPOD_OAUTH_FAILURE,
  PEAPOD_OAUTH_REQUEST,
  PEAPOD_STORE_LOOKUP_FAILURE,
  PEAPOD_STORE_LOOKUP_REQUEST,
  PEAPOD_STORE_LOOKUP_SUCCESS,
} from 'actions/peapod';

const initialState = {
  isValid: true,

  config: {
    zip: '60601',
    city: 'Chicago',
    priceZone: 18,
  },

  pendingConfig: null,
};

const handlers = {
  [RESTORE_FROM_COOKIES]: (state, action) => {
    const data = action.payload[formatKey(PEAPOD_CONFIG)];

    if (data) {
      return assign({}, state, { config: JSON.parse(data) });
    }

    return state;
  },

  [PEAPOD_OAUTH_REQUEST]: state => assign({}, state, { isValid: false }),

  [PEAPOD_OAUTH_FAILURE]: state => assign({}, state, { isValid: true }),

  [PEAPOD_STORE_LOOKUP_REQUEST]: state => assign({}, state, { isValid: false }),

  [PEAPOD_STORE_LOOKUP_FAILURE]: state => assign({}, state, { isValid: true }),

  [PEAPOD_STORE_LOOKUP_SUCCESS](state, action) {
    const { response } = action.payload;
    if (response.length <= 0) {
      return assign({}, state, { isValid: true });
    }

    const { zip } = action.payload;
    const config = response[0];
    const newConfig = assign({ zip }, config);

    const conflict = zip !== state.config.zip;

    if (conflict) {
      return {
        config: state.config,
        pendingConfig: newConfig,
        isValid: true,
      };
    }

    return {
      config: newConfig,
      pendingConfig: null,
      isValid: true,
    };
  },

  [PEAPOD_COMMIT_CONFIG]: state => assign({}, state, {
    config: state.pendingConfig || state.config,
    pendingConfig: null,
  }),

  [PEAPOD_CHANGE_ZIP]: (state, { payload: { zip } }) => assign({}, state, {
    config: assign({}, state.config, { zip }),
    pendingConfig: null,
  }),
};

export default createReducer(initialState, handlers);
