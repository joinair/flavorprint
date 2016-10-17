
import onboarding from './onboarding';
import products from './products';
import recipes from './recipes';
import user from './user';

export default {
  ...products,
  ...recipes,
  ...user,
  ...onboarding,
};
