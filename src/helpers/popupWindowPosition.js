
export default (requiredWidth, requiredHeight) => {
  const left = parseInt((window.screen.availWidth - requiredWidth) / 2, 10);
  const top = parseInt((window.screen.availHeight - requiredHeight) / 2, 10);

  return { left, top };
};
