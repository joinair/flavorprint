
export default () =>
  global.Platform.OS === 'browser' && !!window.__INITIAL_STATE__;
