
import get from 'lodash/get';
import identity from 'lodash/identity';
import noop from 'lodash/noop';

import Rx from 'rx';

import { COOKBOOK_VIEW } from 'constants/AnalyticsEventTypes';
import { COOKBOOK } from 'constants/Routes';

import collections from 'actions/collections';
import cookbook from 'actions/cookbook';
import fetching from 'actions/fetching';

import initialLoad from 'helpers/initialLoad';
import platformPick from 'helpers/platformPick';

import redirectToAuthPage from './helpers/redirectToAuthPage';

import Cookbook from 'components/tmp/Cookbook';

export default store => {
  const originalCookbookRoute = {
    path: COOKBOOK,

    onEnter: (nextState, replace) => {
      if (redirectToAuthPage(store)(nextState, replace)) { return; }

      const { query, state } = nextState.location;

      replace({
        pathname: `/${store.getState().user.profile.username}`,
        query,
        state,
      });
    },
  };

  const secondVersionCookbookRoute = {
    path: '/u/:username',

    onEnter: (nextState, replace) => {
      const { location, params } = nextState;
      const { query, state } = location;

      replace({
        pathname: `/${params.username}`,
        query,
        state,
      });
    },
  };

  const cookbookRoute = {
    path: '/:username',
    component: Cookbook,
    analyticsTag: 'Cookbook',

    prepareData(nextState) {
      if (initialLoad()) { return undefined; }

      const { params } = nextState;

      const observables = [];
      const state = store.getState();
      const { user } = state;
      const { username } = params;

      const nextPathname = get(state, 'router.location.pathname');
      const prevPathname = get(state, 'router.previousState.location.pathname');
      const isReloading = platformPick({
        mobile: true,
        default: nextPathname !== prevPathname || !user.JWTHeader,
      });
      const isShared = username !== get(user, 'profile.username');

      const shouldFetch = platformPick({ mobile: true, browser: true, default: false });

      if (shouldFetch && isReloading) {
        store.dispatch(fetching.start(fetching.GROUP_IDS.COOKBOOK_PAGE));
      }

      if (isShared && isReloading) {
        observables.push(store.dispatch(cookbook.loadCollections({ username })));
      }

      if (user.isAuthenticated) {
        if (!state.collections.isFetched) {
          observables.push(store.dispatch(collections.load()));
        } else if (isReloading && !isShared) {
          observables.push(store.dispatch(collections.load()));
        }
      }

      if (isReloading) {
        if (isShared) {
          observables.push(store.dispatch(cookbook.loadUser(username)));
        } else {
          observables.push(store.dispatch(
            cookbook.loadUser(get(user, 'profile.username'))
          ));
        }
      }

      observables.push(store.dispatch(cookbook.loadRecipes(null, nextState)));

      const fetchers$ = Rx.Observable.from(observables).flatMap(identity);

      if (global.Platform.OS !== 'node') {
        const onSuccess = () => {
          setTimeout(() =>
            store.dispatch({ type: COOKBOOK_VIEW }),
            0
          );
        };

        fetchers$.subscribe(noop, noop, onSuccess);
      }

      if (shouldFetch && isReloading) {
        const onComplete = () =>
          store.dispatch(fetching.stop(fetching.GROUP_IDS.COOKBOOK_PAGE));

        fetchers$.subscribe(noop, onComplete, onComplete);
      }

      return fetchers$;
    },
  };

  return [
    originalCookbookRoute,
    secondVersionCookbookRoute,
    cookbookRoute,
  ];
};
