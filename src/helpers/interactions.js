
import filter from 'lodash/filter';
import last from 'lodash/last';

export const likeState = rec => {
  const ints = filter(
    rec.interactions,
    int => ['LIKE', 'DISLIKE_FLAVOR'].indexOf(int.interaction) >= 0
  );

  const lastInt = last(ints);

  if (lastInt) {
    if (lastInt.interaction === 'LIKE') return 'liked';
    if (lastInt.interaction === 'DISLIKE_FLAVOR') return 'disliked';
  }

  return 'none';
};

export default {
  likeState,
};
