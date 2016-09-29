
export const FLAVORPRINT_API_KEY =
  global.__APP_ENV__ === 'production'
    ? 'i71nzqCfNo6FC3BrIAGN22MhCH5ovQH47WL86rBF'
    : '5gIcyM0Y4BazR1b7HwlmSaP30HbFDLQd7GnjEM9k';

export const FLAVORPRINT_API_URL =
  'https://gateway.myflavorprint.com/qa/';

// TODO consider moving to env variable
export const SESSION_SECRET =
  global.__APP_ENV__ === 'production'
    ? 'f73e8b3de2750fdbdf36c459359d16d3223ffed3a8eeb'
    : '9ad18224bf31b2a2e91403b0170a3e240d48e4d0ea2a1';

export const OAUTH_SECRET = {
  FACEBOOK: 'd88f7ff68604a04efceb44818af85323',
  GOOGLE: '2C0lYkJkVJbLa31AE5KpXnxu',
};

export default {
  FLAVORPRINT_API_KEY,
  FLAVORPRINT_API_URL,

  SESSION_SECRET,
  OAUTH_SECRET,
};
