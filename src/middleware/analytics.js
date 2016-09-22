
import analytics from 'analytics';

export default store => next => action => {
  const previousState = store.getState();
  const result = next(action);
  const state = store.getState();

  setTimeout(() => analytics(state, action, previousState), 0);

  return result;
};
