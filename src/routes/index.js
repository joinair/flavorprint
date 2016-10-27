
import Application from 'components/Application';
import Layout from 'components/tmp/Layout';

import { loadMark } from 'actions/user';

import homeRoute from './home';
import notFound from './notFound';
import productsRoute from './products';
import recipesRoute from './recipes';
import resetPasswordRoute from './resetPassword';
import settingsRoutes from './settings';
import flavorprint from './flavorprint';

import OAuthCallbackRoute from './OAuthCallback';

export default store => [
  OAuthCallbackRoute,

  {
    component: Application,

    prepareData: () => store.dispatch(loadMark()),

    childRoutes: [
      {
        component: Layout,
        childRoutes: [
          flavorprint(store),
          homeRoute(store),
          productsRoute(store),
          recipesRoute(store),
          resetPasswordRoute(store),
          ...settingsRoutes(store),

          notFound(store), // WARNING: this route must be last
        ],
      },
    ],
  },
];
