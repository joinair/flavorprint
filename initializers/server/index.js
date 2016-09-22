/* global __APP_ENV__ __PORT__ */

import path from 'path';
import appModulePath from 'app-module-path';

appModulePath.addPath(path.join(process.cwd(), 'src'));

import cluster from 'cluster';
import domain from 'domain';

import './assignPolyfill';
import './cssHook';
import './svgHook';

import browserCheckMiddleware from './browserCheckMiddleware';

import './globals';
import config from '../config';

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import raven from 'raven';
let sentryClient;

if (process.env.NODE_ENV !== 'development') {
  const SENTRY_DSN = __APP_ENV__ === 'production'
    ? 'https://dac302eec22e46289e32e11cf080ae81:' +
      '53b3ea69ec86409a9737aa0694055d57@app.getsentry.com/68736'
    : 'https://1d936ea2c1fc41f19ae871ab47f14b77:' +
      '9ef661a89cac41979c121f92eca77b18@app.getsentry.com/61598';

  sentryClient = new raven.Client(SENTRY_DSN);
  sentryClient.patchGlobal();
}

if (cluster.isMaster) {
  cluster.fork();
  if (process.env.NODE_ENV !== 'development') {
    cluster.fork();
  }

  cluster.on('disconnect', () => {
    console.error('Worker disconnected!'); // eslint-disable-line
    cluster.fork();
  });
} else {
  const render = require('./render').default;
  const render500 = require('./render500').default;

  let server;
  const application = express();

  application.use((req, res, next) => {
    const reqDomain = domain.create();
    reqDomain.add(req);
    reqDomain.add(res);

    reqDomain.once('error', error => {
      if (process.env.NODE_ENV !== 'development') {
        sentryClient.captureException(new Error(error.message, error.name));

        const killtimer = setTimeout(() => process.exit(1), 30000);
        killtimer.unref();

        server.close();

        if (!cluster.worker.suicide) {
          cluster.worker.disconnect();
        }
      }

      render500(res, error.stack);
    });

    reqDomain.run(next);
  });

  application.use(morgan('combined'));
  application.use(cookieParser());

  if (process.env.NODE_ENV === 'development') {
    application.use(
      config.ASSETS_PUBLIC_PATH,
      express.static(config.STATIC_ASSETS_PATH)
    );

    const webpack = require('webpack');
    const webpackDev = require('webpack-dev-middleware');
    const webpackHot = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack/development').default;
    const compiler = webpack(webpackConfig);

    application.use(webpackDev(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    }));
    application.use(webpackHot(compiler));
  }

  if (process.env.SERVE_ASSETS) {
    application.use(express.static(config.PUBLIC_PATH));
  }

  if (process.env.NODE_ENV !== 'development') {
    application.get('/health-check',
      (req, res) => { res.status(200).send(); });
  }

  application.use(browserCheckMiddleware);
  application.get('*', render);
  server = application.listen(__PORT__); // eslint-disable-line
}
