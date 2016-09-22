
export const openPopupWindow = (...args) => {
  const win = window.open(...args);
  if (win && win.focus) { win.focus(); }
  return win;
};
