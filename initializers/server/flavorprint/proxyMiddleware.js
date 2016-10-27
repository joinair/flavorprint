
import map from 'lodash/map';
import each from 'lodash/each';

import routes from './routes';

export default app =>
  map(routes, ([method, route, handler]) => {
    app[method](route, (req, res) => {
      handler({
        method,
        session: req.session,
        params: req.params,
        query: method === 'get' ? req.query : req.body,
        endpoint: req.path,
        headers: req.headers,
      })
        .subscribe(({ body, headers }) => {
          res.setHeader('Content-Type', 'application/json');
          each((headers || {}), (value, headerName) => {
            res.setHeader(headerName, value);
          });
          res.end(JSON.stringify(body));
        }, err => {
          res.setHeader('Content-Type', 'application/json');
          res.status(401).end(JSON.stringify(err));
        });
    });
  });
