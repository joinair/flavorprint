
export const OPEN_SIDEBAR_MENU = 'OPEN_SIDEBAR_MENU';
export const CLOSE_SIDEBAR_MENU = 'CLOSE_SIDEBAR_MENU';

export const open = () => ({
  type: OPEN_SIDEBAR_MENU,
});

export const close = () => ({
  type: CLOSE_SIDEBAR_MENU,
});

export default { open, close };
