
export const PORT = 3000;

export const PUBLIC_PATH = 'public';
export const ASSETS_PUBLIC_PATH = '/assets';
export const ASSETS_PATH = PUBLIC_PATH + ASSETS_PUBLIC_PATH;
export const STATIC_ASSETS_PATH = 'src/assets';
export const MANIFEST_FILE = 'manifest.json';

export const FLAVORPRINT_API_KEY =
  global.__APP_ENV__ === 'production'
    ? 'i71nzqCfNo6FC3BrIAGN22MhCH5ovQH47WL86rBF'
    : '5gIcyM0Y4BazR1b7HwlmSaP30HbFDLQd7GnjEM9k';

export const FLAVORPRINT_API_URL =
  'https://gateway.myflavorprint.com/qa/';

// TODO consider moving to env variable
export const SESSION_SECRET =
  global.__APP_ENV__ === 'production'
    ? 'f73e8b3de2750fdbdf36c459359d16d3223ffed3a8eeb56b495fca6b5a5574beb17d7d0f71fe4ef060b77a0dc8c624d8'
    : '9ad18224bf31b2a2e91403b0170a3e240d48e4d0ea2a1677c6e91616c66ad6da61f6161311f575c2594651df951bcf88';

export const SESSION_KEYS = [
  'efe36624b6a36320ea6045394192c35ca90b7eb5bfa058daf377cebe',
  'cc6060e3d3476a468c8e7dc213b52bea92d689077bfc03fb0baf19cc',
  'fceb52958966b4714758e121e335ddb7c4402e008e90df7624aa40ed',
];

export const OAUTH_SECRET = {
  FACEBOOK: 'd88f7ff68604a04efceb44818af85323',
};

export default {
  PORT,

  PUBLIC_PATH,
  ASSETS_PUBLIC_PATH,
  ASSETS_PATH,
  STATIC_ASSETS_PATH,
  MANIFEST_FILE,

  FLAVORPRINT_API_KEY,
  FLAVORPRINT_API_URL,

  SESSION_SECRET,
  SESSION_KEYS,
  OAUTH_SECRET,
};
