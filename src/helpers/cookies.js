
import assign from 'lodash/assign';

import config from 'constants/Config';

const { domain } = config.cookie;

export const get = key => {
  const cookies = require('js-cookie');
  return cookies.get(key);
};

export const set = (key, value, options = {}) => {
  const cookies = require('js-cookie');
  return cookies.set(key, value, assign({ domain }, options));
};

export const remove = (key, options = {}) => {
  const cookies = require('js-cookie');
  return cookies.remove(key, assign({ domain }, options));
};

export default { get, set, remove };
