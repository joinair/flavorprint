
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import reject from 'lodash/reject';
import some from 'lodash/some';

/**
Global storage for event handlers.
Format: { eventName: { useCapture: {el: { handleInfo } } } }
Format of handleInfo: { actualHandler: function, handlers: [handler...] }
Format of handler: { callback: function, removed: boolean? }
*/
const eventHandlers = {};

const initializeEventTree = eventName => {
  eventHandlers[eventName] = { true: new Map(), false: new Map() };
};

export const on = (el, eventName, callback, useCapture = false) => {
  if (!eventHandlers[eventName]) {
    initializeEventTree(eventName);
  }

  const handleInfo = eventHandlers[eventName][useCapture].get(el);

  if (handleInfo) {
    if (!some(handleInfo.handlers, { callback })) {
      handleInfo.handlers = handleInfo.handlers.concat({ callback });
    }
  } else {
    const actualHandler = event => {
      forEach(
        eventHandlers[eventName][useCapture].get(el).handlers,
        handler => {
          if (!handler.removed) { handler.callback(event); }
        }
      );
    };

    eventHandlers[eventName][useCapture].set(el, {
      actualHandler,
      handlers: [{ callback }],
    });

    el.addEventListener(eventName, actualHandler, useCapture);
  }
};

export const off = (el, eventName, callback, useCapture = false) => {
  if (!eventHandlers[eventName]) {
    initializeEventTree(eventName);
  }

  const handleInfo = eventHandlers[eventName][useCapture].get(el);

  if (handleInfo) {
    const handler = find(handleInfo.handlers, { callback });

    if (handler) {
      handler.removed = true;
      const handlers = reject(handleInfo.handlers, 'removed');

      if (handlers.length) {
        handleInfo.handlers = handlers;
      } else {
        eventHandlers[eventName][useCapture].delete(el);
        el.removeEventListener(eventName, handleInfo.actualHandler, useCapture);
      }
    }
  }
};

export default { on, off };
