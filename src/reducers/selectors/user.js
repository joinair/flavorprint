
export const userIdSelector = state => state.user.uid;

export const userMarkSelector = state => state.user.profile.mark;

export const isAuthenticatedSelector = state => state.user.isAuthenticated;

export default {
  userIdSelector,
  userMarkSelector,
  isAuthenticatedSelector,
};
