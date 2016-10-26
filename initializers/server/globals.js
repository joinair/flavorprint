
import path from 'path';
import appModulePath from 'app-module-path';

global.Platform = { OS: 'node' };
global.__DEVTOOLS__ = false;

global.__APP_ENV__ = process.env.APP_ENV;
global.__APP_DOMAIN__ = process.env.APP_DOMAIN;
global.__PORT__ = process.env.PORT || 3000;

appModulePath.addPath(path.join(process.cwd(), 'src'));
