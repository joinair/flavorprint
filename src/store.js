
import { createStore, applyMiddleware, compose } from 'redux';

import apiMiddleware from 'middleware/API';
import authentication from 'middleware/authentication';
import chain from 'middleware/chain';
import notObject from 'middleware/notObject';
import thunk from 'redux-thunk';

import reducers from 'reducers';

export default ({
  cookieSelector,
  history,
  initialState,
  extraMiddleware,
}) => {
  const middlewares = [
    thunk,
    authentication,
    chain,
    ...(extraMiddleware || []),
    apiMiddleware,
    notObject,
  ];

  let sagaMiddleware;

  if (global.Platform.OS === 'browser') {
    middlewares.push(require('middleware/history').default(history));
    middlewares.push(require('middleware/cookie').default(cookieSelector));

    sagaMiddleware = require('redux-saga').default();
    middlewares.push(sagaMiddleware);
  }

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(require('middleware/FSA').default);
  }

  let enhancer;

  if (global.Platform.OS === 'browser' &&
      global.__DEVTOOLS__ &&
      process.env.NODE_ENV === 'development') {
    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('components/DevTools').default.instrument()
    );
  } else if (global.Platform.OS === 'browser' &&
             window.devToolsExtension &&
             window.location.hash === '#magic.exe') {
    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension()
    );
  } else {
    enhancer = applyMiddleware(...middlewares);
  }

  const store = createStore(reducers, initialState, enhancer);

  if (global.Platform.OS === 'browser') {
    sagaMiddleware.run(require('sagas').default);
  }

  if (module.hot) {
    module.hot.accept('reducers', () => (
      store.replaceReducer(require('reducers').default)
    ));
  }

  return store;
};
