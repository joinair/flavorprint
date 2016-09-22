
const platform = global.Platform.OS;

const isMobile = platform === 'ios' || platform === 'android';

const platformPick = (options, fallback) => {
  const mobile = isMobile && options.mobile;

  return options[platform] || mobile || options.default || fallback;
};

export const platformPickLazy = (...args) => {
  const action = platformPick(...args);
  return action && action();
};

export default platformPick;
