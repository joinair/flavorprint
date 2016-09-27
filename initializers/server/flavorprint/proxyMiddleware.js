
import apiClient from './apiClient';

const apiProxyMiddleware = (req, res, next) => {
  const regex = /^\/api(\/.*)?$/i;
  const match = req.path.match(regex);

  if (match) {
    const { method, query } = req;
    const httpMethod = method.toLowerCase();
    const endpoint = match[1];

    apiClient({ method: httpMethod, query, endpoint }).subscribe(apiRes => {
      res.append('Content-Type', apiRes.type);
      res.end(apiRes.text);
    }, error => {
      res.status(error.status).end(error.response.text);
    });
  }
  return next();
};

export default apiProxyMiddleware;
