
import cookies from 'helpers/cookies';

const storage = {};

const localStorageTest = () => {
  try {
    window.localStorage.setItem('whisk.localStorageTest', 'sample');
    window.localStorage.removeItem('whisk.localStorageTest');
    return true;
  } catch (e) {
    return false;
  }
};

const isLocalStorageAvailable = localStorageTest();

export const get = (key, fallbackType) => {
  if (isLocalStorageAvailable) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  if (fallbackType === 'cookie') {
    return cookies.get(key) || null;
  }

  return storage[key] || null;
};

export const remove = (key, fallbackType) => {
  if (isLocalStorageAvailable) {
    window.localStorage.removeItem(key);
  } else if (fallbackType === 'cookie') {
    cookies.remove(key);
  } else {
    delete storage[key];
  }
};

export const set = (key, value, fallbackType) => {
  if (isLocalStorageAvailable) {
    window.localStorage.setItem(key, value);
  } else if (fallbackType === 'cookie') {
    cookies.set(key, value);
  } else {
    storage[key] = value;
  }
};

export default { get, remove, set };
