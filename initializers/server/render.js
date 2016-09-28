/* eslint no-param-reassign:0 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Helmet from 'react-helmet';
import uaParser from 'ua-parser-js';

import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';

import get from 'lodash/get';
import includes from 'lodash/includes';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import reduce from 'lodash/reduce';
import replace from 'lodash/replace';

import config from '../config';

let createRoutes = require('routes').default;
let createStore = require('store').default;
const { FP_SESSION, FP_SESSION_SIG } = require('constants/CookiesKeys');

import clientActions from 'actions/client';
import { routerDidChange } from 'actions/router';
import { become, logOut } from 'actions/user';
import cookiesActions from 'actions/cookies';

import prepareData from 'helpers/prepareData';

import render500 from './render500';
import templates from './templates';
import webpackAsset from './webpackAsset';

import BodyClassName from 'components/ui-elements/BodyClassName';

const render = (res, store, context, initialState) => () => {
  const currentState = omit(store.getState(), 'router');

  const state = reduce(
    currentState,
    (result, value, key) => {
      if (value !== initialState[key]) {
        result[key] = value;
      }

      return result;
    },
    {}
  );

  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...context} />
    </Provider>
  );

  res.end(
    templates.body(
      BodyClassName.rewind(),
      content,
      Helmet.rewind(),
      encodeURIComponent(JSON.stringify(state)),
      webpackAsset
    )
  );
};

export default (req, res) => {
  // Browser's history API fails when url contains more than one "/"
  // Here we replace it with single "/"
  if (includes(req.path, '//')) {
    res.status(301).redirect(
      replace(req.path, /\/{2,}/g, '/') + req.url.slice(req.path.length)
    );
    return undefined;
  }

  if (process.env.NODE_ENV === 'development') {
    const reload = require('./reload').default(require);
    createRoutes = reload('routes').default;
    createStore = reload('store').default;
  }

  const store = createStore({});
  const initialState = store.getState();

  store.dispatch(cookiesActions.restore(req.cookies));
  store.dispatch(
    clientActions.checkUserAgent(
      uaParser(req.headers['user-agent'])
    )
  );

  const matchRoute = () => {
    match({
      location: req.url,
      routes: createRoutes(store),
    }, (error, redirect, context) => {
      if (redirect) {
        res.status(301).redirect(redirect.pathname + redirect.search);
      } else if (error) {
        res.status(render500(res, JSON.stringify(error, null, 2)));
      } else if (!context) {
        throw new Error('No context for React router');
      } else {
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.write(templates.head(config, webpackAsset));
        store.dispatch(routerDidChange(context));
        const onComplete = render(res, store, context, initialState);
        const onError = requestError => {
          const errorCode = get(requestError, 'httpCode', 500);

          if (errorCode >= 500) {
            render500(
              res,
              get(requestError, 'stack', JSON.stringify(requestError, null, 2))
            );
          } else {
            onComplete();
          }
        };

        prepareData(store, context)
          .timeout(10000)
          .subscribe(noop, onError, onComplete);
      }
    });
  };

  const logOutAndRender = () => {
    store.dispatch(logOut());
    matchRoute();
  };

  const sessionKey = req.cookies[FP_SESSION];
  const sessionSig = req.cookies[FP_SESSION_SIG];

  store
    .dispatch(become(sessionKey, sessionSig))
    .timeout(10000)
    .subscribe(matchRoute, logOutAndRender);
};
