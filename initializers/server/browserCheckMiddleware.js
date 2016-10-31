
import uaParser from 'ua-parser-js';

import config from '../config';

const browserNotSupportedImage =
  `${config.ASSETS_PUBLIC_PATH}/images/static-images/browser-not-supported.png`;

const browserNotSupportedImage2x =
  `${config.ASSETS_PUBLIC_PATH}/images/static-images/browser-not-supported@2x.png`;

const favicon =
  `${config.ASSETS_PUBLIC_PATH}/images/static-images/favicon2.ico`;

const source = `
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta charset="utf-8" />
    <title>FlavorPrint</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="${favicon}" type="image/x-icon" />
    <style type="text/css">
      .NotSupported {
        display: table;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        font-family: 'CircularStd', 'Open Sans', Helvetica Neue, Arial, Helvetica, sans-serif;
        font-smoothing: antialiased;
        font-size: 22px;
        line-height: 30px;
        color: #454545;
      }

      .NotSupported-view {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }

      .NotSupported-view-image {
        width: 281px;
        height: 80px;
        margin: 0 auto 40px auto;
        background: url('${browserNotSupportedImage}');
      }

      .NotSupported-view-link, .NotSupported-view-link:focus {
        color: #43C36D;
        text-decoration: none;
      }
      .NotSupported-view-link:hover { color: #51D673; }
      .NotSupported-view-link:active { color: #08923D; }

      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        .NotSupported-view-image {
          background: url('${browserNotSupportedImage2x}');
          background-size: 281px 80px;
        }
      }
    </style>
  </head>
  <body>
    <div class="NotSupported">
      <div class="NotSupported-view">
        <div class="NotSupported-view-image"></div>
        Your browser is out of date. <br/>
        Please update or use a different browser. <br/>
        <a class="NotSupported-view-link" href="https://whatbrowser.org/">Learn More</a>
      </div>
    </div>
  </body>
</html>
`;

const restrictedBrowsers = {
  IE: version => parseFloat(version) < 11,
  'Opera Mini': () => true,
};

const browserCheckMiddleware = (req, res, next) => {
  const info = uaParser(req.headers['user-agent']);

  if (info) {
    const { name, version } = info.browser;
    const rule = restrictedBrowsers[name];

    if (rule && rule(version)) {
      return res.end(source);
    }
  }

  next();
};

export default browserCheckMiddleware;
