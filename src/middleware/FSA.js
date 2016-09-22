
import invariant from 'invariant';

import every from 'lodash/every';
import includes from 'lodash/includes';

const validKeys = [
  'type',
  'payload',
  'error',
  'meta',
];

const isValidKey = (_value, key) => includes(validKeys, key);
const isFSA = action => every(action, isValidKey);

export default () => next => action => {
  if (!action.effectId) {
    invariant(isFSA(action), `Not a FSA: ${JSON.stringify(action)}`);
  }

  next(action);
};
