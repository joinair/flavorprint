
import Rx from 'rx';

import identity from 'lodash/identity';

import { FLAVORPRINT } from 'constants/Routes';

import FlavorPrint from 'components/pages/FlavorPrint';

import { loadMark } from 'actions/user';
import home from './home';

export default store => ({
  path: FLAVORPRINT,
  component: FlavorPrint,

  prepareData(...args) {
    const homeRoute = home(store);

    return Rx.Observable
      .from([
        homeRoute.prepareData(...args),
        store.dispatch(loadMark()),
      ])
      .flatMap(identity);
  },
});
