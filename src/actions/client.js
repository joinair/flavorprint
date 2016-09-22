
export const CHECK_USER_AGENT = 'CHECK_USER_AGENT';

export const checkUserAgent = userAgent => ({
  type: CHECK_USER_AGENT,
  payload: userAgent,
});

export default {
  checkUserAgent,
};
