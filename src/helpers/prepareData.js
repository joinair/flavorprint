
import { parse } from 'qs';

import get from 'lodash/get';
import identity from 'lodash/identity';
import noop from 'lodash/noop';

import { compose, filter, map, toArray } from 'transducers.js';
import Rx from 'rx';

import notFound from 'actions/notFound';

export default (store, state) => {
  const { location, params, routes } = state;
  const query = parse(location.search.substr(1));

  const transform = compose(
    map(route => route.prepareData),
    filter(identity),
    map(prepareData => prepareData({ location, params, query })),
    filter(identity)
  );

  const observables$ = toArray(routes, transform);
  const fetchers$ = Rx.Observable.from(observables$).flatMap(identity);

  const onError = error => {
    const code = get(error, 'httpCode');

    if (code !== 401) {
      store.dispatch(notFound.show());
    }
  };

  fetchers$.subscribe(noop, onError);

  return fetchers$;
};
