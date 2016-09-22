
export const HIDE_NOT_FOUND = 'HIDE_NOT_FOUND';
export const SHOW_NOT_FOUND = 'SHOW_NOT_FOUND';

export const hide = () => ({
  type: HIDE_NOT_FOUND,
});

export const show = () => ({
  type: SHOW_NOT_FOUND,
});

export default { hide, show };
