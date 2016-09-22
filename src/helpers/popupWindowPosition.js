
import platformPick from 'helpers/platformPick';

const mobile = () => ({ left: 0, top: 0 });

const browser = (requiredWidth, requiredHeight) => {
  const left = parseInt((window.screen.availWidth - requiredWidth) / 2, 10);
  const top = parseInt((window.screen.availHeight - requiredHeight) / 2, 10);

  return { left, top };
};

export default platformPick({ mobile, browser });
