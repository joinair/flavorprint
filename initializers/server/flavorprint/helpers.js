
import Rx from 'rx';

import apiClient from './apiClient';

export const verifyUser = (handler, id = 'userId') => (req, res) => {
  const userId = req.params[id];

  if (req.session.userId !== userId) {
    return res.status(403).end('Please authorize');
  }

  return handler(req, res);
};

export const passThrough = (req, res) => {
  const { method } = req;
  const httpMethod = method.toLowerCase();
  const query = httpMethod === 'get' ? req.query : req.body;

  const regex = /^\/api(\/.*)?$/i;
  const match = req.path.match(regex);
  const endpoint = match[1];

  return apiClient({ method: httpMethod, query, endpoint }).subscribe(apiRes => {
    res.append('Content-Type', apiRes.type);
    res.end(apiRes.text);
  }, error => {
    res.status(error.status).end(error.response.text);
  });
};

export const toJson = text => {
  const subject = new Rx.AsyncSubject();

  try {
    subject.onNext(JSON.parse(text));
    subject.onCompleted();
  } catch (e) {
    subject.onError('cannot parse json');
  }

  return subject;
};

export const fromJson = json => {
  const subject = new Rx.AsyncSubject();

  try {
    subject.onNext(JSON.stringify(json));
    subject.onCompleted();
  } catch (e) {
    subject.onError('cannot stringify json');
  }

  return subject;
};

export default {
  verifyUser,
  passThrough,
  toJson,
  fromJson,
};
