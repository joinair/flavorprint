
import Application from 'components/Application';
import Layout from 'components/tmp/Layout';

import preferences from 'actions/preferences';
import { anonymousSignUp } from 'actions/user';

import authenticationRoutes from './authentication';
import homeRoute from './home';
import notFound from './notFound';
import recipesRoute from './recipes';
import resetPasswordRoute from './resetPassword';
import settingsRoutes from './settings';

import OAuthCallbackRoute from './OAuthCallback';

export default store => [
  OAuthCallbackRoute,

  {
    component: Application,

    prepareData() {
      if (global.Platform.OS === 'browser') {
        if (!store.getState().user.JWTHeader) {
          store.dispatch(anonymousSignUp());
        }
      }

      return store.dispatch(preferences.load());
    },

    childRoutes: [
      {
        component: Layout,
        childRoutes: [
          ...authenticationRoutes(store),
          homeRoute(store),
          recipesRoute(store),
          resetPasswordRoute(store),
          ...settingsRoutes(store),

          notFound(store), // WARNING: this route must be last
        ],
      },
    ],
  },
];

// FIXME: FOLLOWS
// import followsRoutes from './follows';
// ...followsRoutes(store),
