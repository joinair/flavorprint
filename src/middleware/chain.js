
import clone from 'lodash/clone';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';

import Rx from 'rx';

export const CHAIN = 'CHAIN';

export default store => next => action => {
  if (!get(action, CHAIN)) return next(action);

  let actions = clone(action[CHAIN]);
  const subject = new Rx.Subject();

  let stepResult;

  const submitNext = () => {
    const nextAction = actions.shift();
    const onNext = result => { stepResult = result; };
    const onError = error => subject.onError(error);
    const onSuccess = () => {
      if (actions.length) {
        submitNext();
      } else {
        subject.onCompleted();
      }
    };

    let observable;

    if (isFunction(nextAction)) {
      observable = store.dispatch(nextAction(stepResult));
    } else if (get(nextAction, CHAIN)) {
      actions = [...get(nextAction, CHAIN), ...actions];
      return submitNext();
    } else {
      observable = store.dispatch(nextAction);
    }

    if (get(observable, 'subscribe')) {
      observable.subscribe(onNext, onError, onSuccess);
    } else {
      onSuccess();
    }
  };

  submitNext();
  subject.subscribe(noop, noop);

  return subject;
};
