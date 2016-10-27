
const DOMAIN = global.__APP_DOMAIN__;

const hostPort = host =>
  typeof global.__PORT__ === 'undefined'
    ? host
    : `${host}:${global.__PORT__}`;

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
    ? '474785211570-go3ar3sjrubdh2dg9c35hmmdq2e4rguv.apps.googleusercontent.com'
    : '838731358549-dalr15he82j6vj19j3r8454occqcb6o9.apps.googleusercontent.com',
};

export default {
  cookie,
  domain,
  facebook,
  google,
};
