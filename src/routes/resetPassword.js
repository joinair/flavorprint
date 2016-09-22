
import get from 'lodash/get';

import { RECIPE_FEED, RESET_PASSWORD } from 'constants/Routes';

import user from 'actions/user';

import ResetPassword from 'components/pages/ResetPassword';

export default store => ({
  path: RESET_PASSWORD,
  component: ResetPassword,
  analyticsTag: 'Reset password',

  onEnter(nextState, replace, callback) {
    if (global.Platform.OS === 'browser') {
      callback();
      return undefined;
    }

    const token = get(nextState, 'location.query.token');

    if (!token) {
      replace({ pathname: RECIPE_FEED });
      callback();

      return undefined;
    }

    const onSuccess = ({ authState }) => {
      if (authState === 'DifferentUser') {
        store.dispatch(user.logOut());
      }

      callback();
    };

    const onError = () => {
      replace({ pathname: RECIPE_FEED });
      callback();
    };

    store.dispatch(user.verifyToken(token))
      .timeout(10000)
      .subscribe(onSuccess, onError);
  },
});
