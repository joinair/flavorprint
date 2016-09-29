
import some from 'lodash/some';

import apiClient from './apiClient';

const FORBID_ROUTES = [
  e => e.match(/^\/v3\/users[^\/]*$/i),
];

const apiProxyMiddleware = (req, res, next) => {
  const regex = /^\/api(\/.*)?$/i;
  const match = req.path.match(regex);

  const forbid = () => res.status(403).end('Please authorize');

  if (match) {
    const endpoint = match[1];

    if (some(FORBID_ROUTES, rule => rule(endpoint))) {
      return forbid();
    }

    // check user-specific api
    //
    // /v3/users/{userId}...
    // /v3/recommendations/{userId}...
    const userMatch = endpoint.match(/^\/v3\/(users|recommendations)\/([^\/]+)(\/.*)?/i);
    if (userMatch) {
      const userId = userMatch[2];
      if (req.session.userId !== userId) {
        return forbid();
      }
    }

    const { method } = req;
    const httpMethod = method.toLowerCase();
    const query = httpMethod === 'get' ? req.query : req.body;

    return apiClient({ method: httpMethod, query, endpoint }).subscribe(apiRes => {
      res.append('Content-Type', apiRes.type);
      res.end(apiRes.text);
    }, error => {
      res.status(error.status).end(error.response.text);
    });
  }

  return next();
};

export default apiProxyMiddleware;
