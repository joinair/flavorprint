/* global __APP_ENV__ __PORT__ */

import './globals'; // keep this above everything that uses Config

import cluster from 'cluster';
import domain from 'domain';

import './assignPolyfill';
import './cssHook';
import './svgHook';

import apiProxyMiddleware from './flavorprint/proxyMiddleware';
import authMiddleware from './flavorprint/authMiddleware';
import sessionMiddleware from './flavorprint/sessionMiddleware';
import browserCheckMiddleware from './browserCheckMiddleware';

import config from '../config';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

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
  application.use(sessionMiddleware);

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

  application.use(bodyParser.urlencoded({ extended: false }));
  application.use(bodyParser.json());

  application.post('/api/auth/:action', authMiddleware);
  apiProxyMiddleware(application);
  application.use(browserCheckMiddleware);
  application.get('*', render);
  server = application.listen(__PORT__); // eslint-disable-line
}
