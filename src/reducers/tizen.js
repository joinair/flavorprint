
import createReducer from 'helpers/createReducer';

import { CHECK_USER_AGENT } from 'actions/client';

const initialState = {
  isTizen: null,
  isFridge: null,
};

const isFridgeUA = ua => /FamilyHub/.test(ua);

const handlers = {
  [CHECK_USER_AGENT]: (state, action) => {
    const { ua, os, device } = action.payload;

    const isTizen = os.name === 'Tizen';
    const isMobile = device.type === 'mobile';
    const isFridge = isTizen && isMobile && isFridgeUA(ua);

    return { isTizen, isFridge };
  },
};

export default createReducer(initialState, handlers);
