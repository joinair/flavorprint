
import Rx from 'rx';

const actions$ = new Rx.Subject();

import handlers from './handlers';

handlers(actions$);

export default (state, action, previousState) => {
  actions$.onNext({ state, action, previousState });
};
