
import {
  verifyUser,
  passThroughWithUser,
} from './helpers';

import recommendations from './routes/recommendations';
import onboarding from './routes/onboarding';

export default app => {
  // Like/Dislike recipes
  app.post(
    '/api/custom/users/interactions',
    passThroughWithUser(id => `/v3/users/${id}/interactions`)
  );

  // Comptibility ("match") score for recipes
  app.get(
    '/api/custom/recommendations/compatibilities',
    passThroughWithUser(id => `/v3/recommendations/${id}/compatibilities`)
  );

  // Recipes/Products page
  app.get('/api/custom/recommendations', verifyUser(recommendations));

  // Onboarding
  app.get('/api/custom/onboarding/recipes', verifyUser(onboarding.recipes));
  app.get('/api/custom/onboarding/questions', verifyUser(onboarding.questions.load));
  app.post('/api/custom/onboarding/questions', verifyUser(onboarding.questions.answer));

  // Flavorprint mark
  app.get(
    '/api/custom/users/mark',
    passThroughWithUser(id => `/v3/users/${id}/marks/personal`)
  );
};
