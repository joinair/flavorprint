
export const GROUP_IDS = {
  FEED: 'FEED',
  HOME_PAGE: 'HOME_PAGE',
};

export const START_FETCHING = 'START_FETCHING';
export const STOP_FETCHING = 'STOP_FETCHING';

export const start = (groupId, payload = true) => ({
  type: START_FETCHING,
  payload: { groupId, payload },
});

export const stop = groupId => ({
  type: STOP_FETCHING,
  payload: { groupId },
});

export default { GROUP_IDS, start, stop };
