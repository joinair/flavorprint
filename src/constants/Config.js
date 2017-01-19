
const DOMAIN = global.__APP_DOMAIN__ || 'localhost';

const hostPort = host =>
  typeof global.__PORT__ === 'undefined'
    ? host
    : `${host}:${global.__PORT__}`;

const defaultProtocol =
  process.env.NODE_ENV === 'development'
    ? 'http:' : 'https:';

const protocol =
  (global.Platform.OS !== 'browser')
    ? defaultProtocol
    : document.location.protocol;

export const cookie = {
  domain: '.' + DOMAIN,
  secure: protocol === 'https:',
};

export const domain = {
  development: `${protocol}//${hostPort(DOMAIN)}`,
  production: `${protocol}//${DOMAIN}`,
}[global.__APP_ENV__];

export const facebook = {
  id: '949513865124484'
};

export const google = {
  analyticsId: global.__APP_ENV__ === 'production'
    ? 'UA-47558985-1'
    : 'UA-47558985-2',

  id: '474785211570-go3ar3sjrubdh2dg9c35hmmdq2e4rguv.apps.googleusercontent.com'
};

export default {
  cookie,
  domain,
  facebook,
  google,
};
