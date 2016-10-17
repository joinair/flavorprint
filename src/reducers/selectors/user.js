
export const userIdSelector = state => state.user.uid;

export const userMarkSelector = state => state.user.profile.mark;

export default {
  userIdSelector,
  userMarkSelector,
};
