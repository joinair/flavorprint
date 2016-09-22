
import identity from 'lodash/identity';
import noop from 'lodash/noop';
import Rx from 'rx';
import size from 'lodash/size';

import { STEPS } from 'constants/Onboarding';
import { HOME } from 'constants/Routes';
import { ONBOARDING, ONBOARDING_CONTINUE } from 'constants/QueryParams';

import collections from 'actions/collections';
import feed, { CONTEXT } from 'actions/feed';
import fetching from 'actions/fetching';
import onboarding from 'actions/onboarding';

import initialLoad from 'helpers/initialLoad';
import { platformPickLazy } from 'helpers/platformPick';

import Home from 'components/tmp/Home';

export default store => ({
  path: HOME,
  component: Home,
  analyticsTag: 'Recipe feed',

  prepareData({ query }) {
    if (initialLoad() && query[ONBOARDING] === ONBOARDING_CONTINUE) {
      const profile = store.getState().user.profile;

      if (size(STEPS) > size(profile.onboarding)) {
        setTimeout(() =>
          store.dispatch(onboarding.open('Email')),
          0
        );
      }
    }

    if (!initialLoad()) {
      if (global.Platform.OS === 'browser') {
        store.dispatch(fetching.start(fetching.GROUP_IDS.HOME_PAGE));
      }

      const observables = platformPickLazy({
        mobile: () => (store.getState().feed.context !== CONTEXT.FEED)
          ? [store.dispatch(feed.load())]
          : [],

        default: () => [store.dispatch(feed.load())],
      });

      const state = store.getState();
      const { user } = state;

      if (global.Platform.OS === 'browser') {
        const onComplete = () =>
          store.dispatch(fetching.stop(fetching.GROUP_IDS.HOME_PAGE));

        Rx.Observable.from(observables).flatMap(identity)
          .subscribe(noop, onComplete, onComplete);
      }

      if (user.isAuthenticated && !state.collections.isFetched) {
        observables.push(store.dispatch(collections.load()));
      }

      return Rx.Observable.from(observables).flatMap(identity);
    }
  },
});
