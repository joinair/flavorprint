
import handlers from './handlers';

export default (req, res) => {
  const handler = handlers[req.params.action];
  return handler && handler(req, res);
};
