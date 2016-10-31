/* global __APP_DOMAIN__ __APP_ENV__ __PORT__ */
/* eslint max-len:0 */

export const head = (config, webpackAsset) => `
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="${config.ASSETS_PUBLIC_PATH}/images/static-images/favicon2.ico" type="image/x-icon" />
    <meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport" />
    ${
      (process.env.NODE_ENV !== 'development')
        ? `<link rel="stylesheet" type="text/css" href="${webpackAsset('style', 'css')}" />`
        : ''
    }
    ${
      (process.env.NODE_ENV !== 'development')
        ? '<script src="https://cdn.ravenjs.com/1.3.0/native/raven.min.js"></script>'
        : ''
    }
    <script type="text/javascript" src="${webpackAsset('meta', 'js')}"></script>
    <script type="text/javascript" src="${webpackAsset('vendor', 'js')}"></script>
    <script type="text/javascript">
      window.__APP_DOMAIN__ = "${__APP_DOMAIN__}";
      window.__APP_ENV__ = "${__APP_ENV__}";
    </script>
    <script type="text/javascript">window.__APP_ENV__ = "${__APP_ENV__}"</script>
    ${
      (process.env.NODE_ENV === 'development')
        ? `<script type="text/javascript">window.__PORT__ = ${__PORT__}</script>`
        : ''
    }
`;

export const body = (bodyClasses, content, helmet, initialState, webpackAsset) => `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
  </head>

  <body class="${bodyClasses || ''}">
    <div id="content" onclick="void(0)">${content}</div>
    ${(process.env.NODE_ENV === 'development') ? '<div id="devtools"></div>' : ''}
    <script type="text/javascript">window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;</script>
    <script type="text/javascript">window.__INITIAL_STATE__ = "${initialState}"</script>
    <script type="text/javascript" src="${webpackAsset('bundle', 'js')}"></script>
    ${
      (process.env.NODE_ENV !== 'development')
        ? '<script type="text/javascript" async src="//www.google-analytics.com/analytics.js"></script>'
        : ''
    }
  </body>
</html>
`;

export default { head, body };
