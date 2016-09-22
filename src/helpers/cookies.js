
import assign from 'lodash/assign';

import config from 'constants/Config';

const { domain, prefix } = config.cookie;

export const formatKey = key => `${prefix}.${key}`;

export const get = key => {
  const cookies = require('js-cookie');
  return cookies.get(formatKey(key));
};

export const set = (key, value, options = {}) => {
  const cookies = require('js-cookie');
  return cookies.set(formatKey(key), value, assign({ domain }, options));
};

export const remove = (key, options = {}) => {
  const cookies = require('js-cookie');
  return cookies.remove(formatKey(key), assign({ domain }, options));
};

export default { formatKey, get, set, remove };
