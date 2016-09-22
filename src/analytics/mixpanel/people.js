
import mixpanel from 'mixpanel-browser';

const increment = (name, delta = 1) => mixpanel.people.increment(name, delta);

const set = (properties = {}) => mixpanel.people.set(properties);

const union = (name, value) => mixpanel.people.union(name, value);

export default {
  increment,
  set,
  union,
};
