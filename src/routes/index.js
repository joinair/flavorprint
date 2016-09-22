
import Application from 'components/Application';
import Layout from 'components/tmp/Layout';

import preferences from 'actions/preferences';
import { anonymousSignUp } from 'actions/user';

import authenticationRoutes from './authentication';
import cookbookRoutes from './cookbook';
import homeRoute from './home';
import notFound from './notFound';
import printRecipeRoute from './printRecipe';
import printShoppingListRoute from './printShoppingList';
import recipesRoutes from './recipes';
import resetPasswordRoute from './resetPassword';
import searchResults from './searchResults';
import settingsRoutes from './settings';
import shoppingListRoute from './shoppingList';
import onlineCheckoutRoute from './onlineCheckout';

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
      printShoppingListRoute(store),
      printRecipeRoute(store),

      {
        component: Layout,
        childRoutes: [
          ...authenticationRoutes(store),
          homeRoute(store),
          ...recipesRoutes(store),
          resetPasswordRoute(store),
          searchResults(store),
          ...settingsRoutes(store),
          shoppingListRoute(store),
          onlineCheckoutRoute(store),

          ...cookbookRoutes(store), // WARNING: this route must be penultimate
          notFound(store), // WARNING: this route must be last
        ],
      },
    ],
  },
];

// FIXME: FOLLOWS
// import followsRoutes from './follows';
// ...followsRoutes(store),
