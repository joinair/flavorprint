
export const RESTORE_FROM_COOKIES = 'RESTORE_FROM_COOKIES';

export const restore = (cookies = {}) => ({
  type: RESTORE_FROM_COOKIES,
  payload: cookies,
});

export default { restore };
