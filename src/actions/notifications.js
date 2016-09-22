
import uuid from 'uuid';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const show = (text) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    text,
    uuid: uuid.v4(),
  },
});

export const hide = () => ({
  type: HIDE_NOTIFICATION,
});

export default { show, hide };
