
import mixpanel from 'mixpanel-browser';

export const clear = () => mixpanel.cookie.clear();

export default {
  clear,
};
