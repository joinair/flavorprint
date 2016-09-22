
import get from 'lodash/get';

import { stringify } from 'qs';

export const HISTORY_CALL = 'HISTORY_CALL';

export default history => store => next => action => {
  if (!get(action, HISTORY_CALL)) return next(action);

  const { method, pathname, query, state } = get(action, HISTORY_CALL);
  const stringified = query && stringify(query);
  const search = stringified && (`?${stringified}`);
  const samePathname = get(store.getState(), 'router.location.pathname');

  return history[method]({ pathname: pathname || samePathname, search, state });
};
