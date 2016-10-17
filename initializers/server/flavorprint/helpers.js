
import apiClient from './apiClient';

export const verifyUser = handler => (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    return res.status(403).end('Please authorize');
  }

  return handler(req, res);
};

export const passThrough = _endpoint => (req, res) => {
  const { method } = req;
  const httpMethod = method.toLowerCase();
  const query = httpMethod === 'get' ? req.query : req.body;

  const regex = /^\/api(\/.*)?$/i;
  const match = req.path.match(regex);
  const endpoint = _endpoint || match[1];

  return apiClient({ method: httpMethod, query, endpoint }).subscribe(apiRes => {
    res.append('Content-Type', apiRes.type);
    res.end(apiRes.text);
  }, error => {
    res.status(error.status).end(error.response.text);
  });
};

export const passThroughWithUser = endpoint => verifyUser(
  (req, res) => passThrough(endpoint(req.session.userId))(req, res)
);

export default {
  verifyUser,
  passThrough,
  passThroughWithUser,
};
