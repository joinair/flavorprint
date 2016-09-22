
import request from 'superagent';
import qs from 'qs';

import {
  FLAVORPRINT_API_URL,
  FLAVORPRINT_API_KEY,
} from '../config';

const sendMethod = HTTPMethod =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? 'send'
    : 'query';

const sendArguments = (HTTPMethod, query) =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' });

const apiProxyMiddleware = (req, res, next) => {
  const regex = /^\/api(\/.*)?$/i;
  const match = req.path.match(regex);

  if (match) {
    const url = FLAVORPRINT_API_URL;
    const { method, query } = req;
    const httpMethod = method.toLowerCase();
    const endpoint = match[1];
    const headers = {
      'x-api-key': FLAVORPRINT_API_KEY,
    };

    return request
      [httpMethod](url + endpoint)
      [sendMethod(httpMethod)](sendArguments(httpMethod, query))
      .set(headers)
      .end((error, apiRes) => {
        if (error) {
          res.status(error.status).end(error.response.text);
        } else {
          res.append('Content-Type', apiRes.type);
          res.end(apiRes.text);
        }
      });
  }
  return next();
};

export default apiProxyMiddleware;
