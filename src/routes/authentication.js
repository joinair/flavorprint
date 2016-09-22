
import assign from 'lodash/assign';

import { SIGN_UP, LOG_IN } from 'constants/Routes';

import Authentication from 'components/pages/Authentication';

export default store => {
  const makeRoute = args =>
    assign({
      component: Authentication,

      onEnter(nextState, replace) {
        if (store.getState().user.isAuthenticated) {
          replace('/');
        }
      },
    }, args);

  const signupRoute = makeRoute({
    path: SIGN_UP,
    analyticsTag: 'Sign Up',
  });

  const loginRoute = makeRoute({
    path: LOG_IN,
    analyticsTag: 'Log In',
  });

  return [
    signupRoute,
    loginRoute,
  ];
};
