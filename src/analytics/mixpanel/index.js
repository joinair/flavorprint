
import mixpanel from 'mixpanel-browser';

import assign from 'lodash/assign';

import Config from 'constants/Config';

import cookie from './cookie';
export { default as cookie } from './cookie';

import people from './people';
export { default as people } from './people';

export const alias = uid => mixpanel.alias(uid);

export const getDistinctId = () => mixpanel.get_distinct_id();

export const getProperty = name => mixpanel.get_property(name);

export const identify = uid => mixpanel.identify(uid);

export const init = (token, options = {}) => mixpanel.init(token, options);

export const register = (properties = {}) => mixpanel.register(properties);

export const reset = () => cookie.clear();

export const track = (event, state, properties = {}) =>
  mixpanel.track(event, assign({
    'App Id': Config.mixpanel.appName,
    Authenticated: !!state.user.isAuthenticated,
  }, properties));

export default {
  alias,
  cookie,
  getDistinctId,
  getProperty,
  identify,
  init,
  people,
  register,
  reset,
  track,
};
