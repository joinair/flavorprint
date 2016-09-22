
import get from 'lodash/get';

export const UNAUTHENTICATED = 'UNAUTHENTICATED';

export default store => next => action => {
  const authenticationRequired = get(action, 'meta.authenticationRequired');

  if (!authenticationRequired) return next(action);

  const isAuthenticated = store.getState().user.isAuthenticated;

  if (!isAuthenticated) {
    return next({
      type: UNAUTHENTICATED,
      payload: action,
    });
  }

  return next(action);
};
