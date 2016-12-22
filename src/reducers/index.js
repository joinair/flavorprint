
import { combineReducers } from 'redux';

import fetching from './fetching';
import modal from './modal';
import notFound from './notFound';
import notifications from './notifications';
import onboarding from './onboarding';
import products from './products';
import recipes from './recipes';
import router from './router';
import sidebarMenu from './sidebarMenu';
import user from './user';
import interactions from './interactions';

export default combineReducers({
  fetching,
  modal,
  notFound,
  notifications,
  onboarding,
  products,
  recipes,
  router,
  sidebarMenu,
  user,
  interactions,
});
