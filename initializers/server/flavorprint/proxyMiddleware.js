
import {
  verifyUser,
  passThrough,
  passThroughWithUser,
} from './helpers';

import recommendations from './routes/recommendations';

export default app => {
  app.post(
    '/api/custom/users/interactions',
    passThroughWithUser(id => `/v3/users/${id}/interactions`)
  );

  app.get(
    '/api/custom/recommendations/compatibilities',
    passThroughWithUser(id => `/v3/recommendations/${id}/compatibilities`)
  );

  app.post(
    '/api/custom/users/interactions',
    passThroughWithUser(id => `/v3/users/${id}/interactions`)
  );

  app.get(
    '/api/custom/recommendations',
    verifyUser(recommendations)
  );

  app.post(
    '/api/custom/users/preferences',
    passThroughWithUser(id => `/v3/users/${id}/preferences`)
  );

  app.get('/api/v3/recommendations', passThrough());
};
