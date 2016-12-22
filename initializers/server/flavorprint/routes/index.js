
import recommendations from './recommendations';
import onboarding from './onboarding';
import become from './become';
import facebook from './facebook';
import google from './google';

import {
  verifyUser,
  passThroughWithUser,
} from '../helpers';

export default [
  // Authorization
  ['post', '/api/auth/become', become],
  ['post', '/api/auth/facebook', facebook],
  ['post', '/api/auth/google', google],

  // User interactions
  ['get', '/api/custom/users/interactions',
    passThroughWithUser(id => `/v3/users/${id}/interactions`)],

  // Like/Dislike recipes
  ['post', '/api/custom/users/interactions',
    passThroughWithUser(id => `/v3/users/${id}/interactions`)],

  // Comptibility ("match") score for recipes
  ['get', '/api/custom/recommendations/compatibilities',
    passThroughWithUser(id => `/v3/recommendations/${id}/compatibilities`)],

  // Recipes/Products page
  ['get', '/api/custom/recommendations',
    verifyUser(recommendations)],

  // Onboarding
  ['get', '/api/custom/onboarding/recipes',
    verifyUser(onboarding.recipes)],
  ['get', '/api/custom/onboarding/questions',
    verifyUser(onboarding.questions.load)],
  ['post', '/api/custom/onboarding/questions',
    verifyUser(onboarding.questions.answer)],

  // Flavorprint mark
  ['get', '/api/custom/users/mark',
    passThroughWithUser(id => `/v3/users/${id}/marks/personal`)],
];
