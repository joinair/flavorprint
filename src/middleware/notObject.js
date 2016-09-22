
import isObject from 'lodash/isObject';

export default () => next => action => {
  if (isObject(action)) {
    next(action);
  }
};
