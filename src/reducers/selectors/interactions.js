
export const shouldShowScore = state =>
  state.interactions.totalElements >= 3;

export default {
  shouldShowScore,
};
