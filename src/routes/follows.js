
import get from 'lodash/get';
import identity from 'lodash/identity';
import Rx from 'rx';

import follows, { USER_FOLLOWERS, USER_FOLLOWING } from 'actions/follows';
import cookbook from 'actions/cookbook';

import initialLoad from 'helpers/initialLoad';

import Follows from 'components/tmp/Follows';

export default store => {
  const followsRoute = (path, followType, analyticsTag) => ({
    path: `/:username/${path}`,
    component: Follows,
    analyticsTag,

    prepareData({ params }) {
      if (initialLoad()) { return undefined; }

      const state = store.getState();
      const { username } = params;

      const observables = [
        store.dispatch(follows.loadUserFollows(false, followType)),
      ];

      if (username !== get(state, 'cookbook.user.profile.username')) {
        observables.push(store.dispatch(cookbook.loadUser(username)));
      }

      return Rx.Observable.from(observables).flatMap(identity);
    },
  });

  return [
    followsRoute('followers', USER_FOLLOWERS, 'User followers'),
    followsRoute('following', USER_FOLLOWING, 'User following'),
  ];
};
