
import config from 'constants/Config';

import cookies from 'helpers/cookies';

import forEach from 'lodash/forEach';

const expires = 365;
const { secure } = config.cookie;

export default selector => store => next => action => {
  next(action);
  forEach(
    selector(store.getState()),
    (value, key) => {
      if (value) {
        cookies.set(key, value, { expires, secure });
      } else {
        cookies.remove(key);
      }
    }
  );
};
