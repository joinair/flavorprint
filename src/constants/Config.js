
export const api = {
  host: global.__APP_ENV__ === 'production'
    ? 'whisk.com'
    : `localhost:${global.__PORT__}`,

  url: global.__APP_ENV__ === 'production'
    ? 'https://whisk.com/api'
    : `http://localhost:${global.__PORT__}/api`,

  protocol: global.__APP_ENV__ === 'production'
    ? 'https'
    : 'http',
};

export const banner = {
  name: 'Hero v5',
};

export const cloudinary = (() => {
  const apiKey = '387429317192936';
  const cloudName = 'whisk';
  const avatarsPreset = 'v3-user-profile-image';
  const recipesPreset = 'v3-recipe-upload';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}`;

  return { apiKey, cloudName, avatarsPreset, recipesPreset, url };
})();

export const cookie = {
  domain: process.env.NODE_ENV === 'production'
    ? '.whisk.com'
    : '',

  prefix: {
    development: 'localhost.whisk',
    staging: 'dev.whisk',
    production: 'whisk',
  }[global.__APP_ENV__],
};

export const domain = {
  development: typeof global.__PORT__ === 'undefined'
    ? 'http://localhost'
    : `http://localhost:${global.__PORT__}`,
  staging: 'https://dev.whisk.com',
  production: 'https://whisk.com',
}[global.__APP_ENV__];

export const facebook = {
  id: global.__APP_ENV__ === 'production'
    ? '1439473699618528'
    : '1785132991698406',
};

export const google = {
  analyticsId: global.__APP_ENV__ === 'production'
    ? 'UA-32886766-7'
    : 'UA-32886766-8',

  id: global.__APP_ENV__ === 'production'
    ? '1034335430073-f61h59ao6d5pl2ceir1v6sl15lqm5d8c.apps.googleusercontent.com'
    : '1034335430073-uvt9cd9r7cg1b78t9pb90h40svuv5hfs.apps.googleusercontent.com',
};

export const sentry = {
  dsn: global.__APP_ENV__ === 'production'
    ? 'https://dac302eec22e46289e32e11cf080ae81@app.getsentry.com/68736'
    : 'https://1d936ea2c1fc41f19ae871ab47f14b77@app.getsentry.com/61598',
};

export default {
  api,
  banner,
  cloudinary,
  cookie,
  domain,
  facebook,
  google,
  sentry,
};
