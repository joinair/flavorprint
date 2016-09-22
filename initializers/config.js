
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

export default {
  PORT,

  PUBLIC_PATH,
  ASSETS_PUBLIC_PATH,
  ASSETS_PATH,
  STATIC_ASSETS_PATH,
  MANIFEST_FILE,

  FLAVORPRINT_API_KEY,
  FLAVORPRINT_API_URL,
};
