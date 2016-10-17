
import { verifyUser, passThrough } from './helpers';

import recommendations from './routes/recommendations';

export default app => {
  app.get('/api/v3/recommendations/:userId', verifyUser(passThrough));
  app.get('/api/v3/recommendations/:userId/compatibilities', verifyUser(passThrough));
  app.post('/api/v3/users/:userId/interactions', verifyUser(passThrough));
  app.get('/api/custom/recommendations/:userId', verifyUser(recommendations));
  app.get('/api/v3/recommendations', passThrough);
  app.get('/api/v3/users/:userId/preferences', verifyUser(passThrough));
};
