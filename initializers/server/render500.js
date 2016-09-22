
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Helmet from 'react-helmet';

import config from '../config';

import templates from './templates';
import webpackAsset from './webpackAsset';

import BackendError from 'components/pages/BackendError';
import BodyClassName from 'components/ui-elements/BodyClassName';

export default (res, message) => {
  if (!res.headersSent) {
    res.status(500);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write(templates.head(config, webpackAsset));
  }

  BodyClassName.rewind();
  Helmet.rewind();

  const content = ReactDOMServer.renderToStaticMarkup(
    <BackendError message={message} />
  );

  res.end(`
      <title>Oops!</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    </head>

    <body>
      <div id="content">
        ${content}
      </div>
    </body>
  `);
};
