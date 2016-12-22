
import onboarding from './onboarding';
import products from './products';
import recipes from './recipes';
import user from './user';
import interactions from './interactions';

export default {
  ...products,
  ...recipes,
  ...user,
  ...onboarding,
  ...interactions,
};
