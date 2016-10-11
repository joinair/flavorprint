
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

export default {
  verifyUser,
  passThrough,
};
