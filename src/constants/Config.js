
const DOMAIN = global.__APP_DOMAIN__;

const hostPort = host =>
  typeof global.__PORT__ === 'undefined'
    ? host
    : `${host}:${global.__PORT__}`;

const protocol =
  (global.Platform.OS !== 'browser')
    ? 'https:'
    : document.location.protocol;

export const cookie = {
  domain: global.__APP_ENV__ === 'production'
    ? '.' + DOMAIN
    : 'localhost',

  secure:
    process.env.NODE_ENV !== 'development' &&
    protocol === 'https:',
};

export const domain = {
  development: `http://${hostPort('localhost')}`,
  production: `${protocol}//${DOMAIN}`,
}[global.__APP_ENV__];

export const facebook = {
  id: global.__APP_ENV__ === 'production'
    ? '949513865124484'
    : '1785132991698406',
};

export const google = {
  analyticsId: global.__APP_ENV__ === 'production'
    ? 'UA-47558985-1'
    : 'UA-47558985-2',

  id: global.__APP_ENV__ === 'production'
    ? '474785211570-go3ar3sjrubdh2dg9c35hmmdq2e4rguv.apps.googleusercontent.com'
    : '838731358549-dalr15he82j6vj19j3r8454occqcb6o9.apps.googleusercontent.com',
};

export default {
  cookie,
  domain,
  facebook,
  google,
};
