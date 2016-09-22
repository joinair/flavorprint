/* global Raven */
/* eslint no-param-reassign:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { RouterContext, browserHistory, match } from 'react-router';

import get from 'lodash/get';
import pick from 'lodash/pick';

import createStore from 'store';

import { APP_LAUNCHED } from 'constants/AnalyticsEventTypes';
import config from 'constants/Config';
import { JWT_HEADER, SHOPPING_LIST_VIEW, PEAPOD_CONFIG } from 'constants/CookiesKeys';
import { SHOPPING_LIST_OPERATIONS } from 'constants/LocalStorageKeys';

import notFound from 'actions/notFound';
import { routerDidChange } from 'actions/router';
import shoppingList from 'actions/shoppingList';

import createRoutes from 'routes';

import prepareData from 'helpers/prepareData';
import storage from 'helpers/storage';

import './styles.css';

if (process.env.NODE_ENV !== 'development' && typeof Raven !== 'undefined') {
  Raven.config(config.sentry.dsn, { release: global.__BUILD_NUMBER__ }).install();
}

if (process.env.NODE_ENV === 'production') {
  window.ga('create', config.google.analyticsId, 'auto');
}

const cookieSelector = state => ({
  [JWT_HEADER]: get(state, 'user.JWTHeader'),
  [SHOPPING_LIST_VIEW]: get(state, 'shoppingList.sortBy'),
  [PEAPOD_CONFIG]: state.peapod.config,
});

const history = browserHistory;

const store = createStore({
  cookieSelector,
  history,
  initialState: JSON.parse(decodeURIComponent(window.__INITIAL_STATE__)),
});

const routes = createRoutes(store);

history.listen(location => {
  match({
    history,
    location,
    routes,
  }, (error, redirect, state) => {
    if (redirect) {
      history.replace(pick(redirect, 'pathname', 'state', 'query'));
      return;
    }

    if (!error) {
      state.location.action = location.action;
      store.dispatch(routerDidChange(state));

      if (!store.getState().router.synthetic) {
        const prevLocation =
          get(store.getState().router, 'previousState.location');

        if (location.action !== 'POP' || !prevLocation) {
          window.scroll(0, 0);
        }

        if (store.getState().notFound && prevLocation) {
          store.dispatch(notFound.hide());
        }

        prepareData(store, state);

        if (process.env.NODE_ENV === 'production') {
          window.ga('send', 'Pageview', {
            page:
              get(store.getState().router, 'location.pathname', '') +
              get(store.getState().router, 'location.search', ''),
          });
        }
      }

      ReactDOM.render(
        <Provider store={store}>
          <RouterContext {...state} />
        </Provider>,

        document.getElementById('content'),

        () => {
          if (window.__INITIAL_STATE__) {
            delete window.__INITIAL_STATE__;

            const shoppingListOperations =
              JSON.parse(storage.get(SHOPPING_LIST_OPERATIONS) || null) || [];

            if (shoppingListOperations.length) {
              store.dispatch(shoppingList.restoreOperations(shoppingListOperations));
            }
          }
        }
      );
    }
  });
});

if (global.__DEVTOOLS__ && process.env.NODE_ENV === 'development' &&
    !window.devToolsExtension) {
  const DevTools = require('components/DevTools').default;

  ReactDOM.render(
    <Provider store={store}><DevTools /></Provider>,
    document.getElementById('devtools')
  );
}

if (process.env.NODE_ENV === 'production') {
  const mixpanel = require('analytics/mixpanel');

  mixpanel.init(config.mixpanel.token, {
    loaded: () => {
      const state = store.getState();

      if (state.user.uid === mixpanel.getDistinctId()) {
        if (state.user.isAuthenticated) {
          mixpanel.identify(state.user.uid);
        }
      }

      store.dispatch({ type: APP_LAUNCHED });
    },
  });
}
