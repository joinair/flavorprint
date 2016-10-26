
const DOMAIN = global.__APP_DOMAIN__;

const hostPort = host =>
  typeof global.__PORT__ === 'undefined'
    ? host
    : `${host}:${global.__PORT__}`;

export const api = {
  host: global.__APP_ENV__ === 'production'
    ? hostPort(DOMAIN)
    : `localhost:${global.__PORT__}`,

  url: global.__APP_ENV__ === 'production'
    ? `https://${hostPort(DOMAIN)}/api`
    : `http://${hostPort('localhost')}/api`,

  protocol: global.__APP_ENV__ === 'production'
    ? 'https'
    : 'http',
};

export const cookie = {
  domain: global.__APP_ENV__ === 'production'
    ? '.' + DOMAIN
    : 'localhost',
};

export const domain = {
  development: `http://${hostPort('localhost')}`,
  production: `https://${DOMAIN}`,
}[global.__APP_ENV__];

export const facebook = {
  id: global.__APP_ENV__ === 'production'
    ? '1439473699618528'
    : '1785132991698406',
};

export const google = {
  analyticsId: global.__APP_ENV__ === 'production'
    ? 'UA-XXXXXXXX-7'
    : 'UA-XXXXXXXX-8',

  id: global.__APP_ENV__ === 'production'
    ? 'XXXXXXXXXXXX-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY.apps.googleusercontent.com'
    : 'XXXXXXXXXXXX-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY.apps.googleusercontent.com',
};

export default {
  api,
  cookie,
  domain,
  facebook,
  google,
};
