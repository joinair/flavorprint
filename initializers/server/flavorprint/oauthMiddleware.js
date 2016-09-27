
import handlers from './handlers';

export default (req, res, next) => {
  if (req.path === '/test-session') {
    return res.end(JSON.stringify(req.session));
  }

  const match = req.path.match(/^\/api\/auth\/(.*)$/i);

  if (req.method === 'POST' && match) {
    const handler = handlers[match[1]];
    return handler && handler(req, res);
  }

  return next();
};
