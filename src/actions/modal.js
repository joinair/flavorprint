
import assign from 'lodash/assign';
import omit from 'lodash/omit';

import router from './router';

export const open =
  (type, payload = null, settings = {}) => (dispatch, getState) => {
    const { pathname, query, state } = getState().router.location;

    return dispatch(
      router.push(
        pathname,
        query,
        assign({}, state, { modal: { type, payload, settings } })
      )
    );
  };

export const openWithReplacement =
  (type, payload = null, settings = {}) => (dispatch, getState) => {
    const { pathname, query, state } = getState().router.location;

    return dispatch(
      router.replace(
        pathname,
        query,
        assign({}, state, { modal: { type, payload, settings } })
      )
    );
  };

export const close = router.goBack;

export const fullyClose = () => (dispatch, getState) => {
  const { pathname, state, query } = getState().router.location;

  return dispatch(
    router.push(pathname, query, omit(state, 'modal'))
  );
};

export default {
  open,
  openWithReplacement,

  close,
  fullyClose,
};
