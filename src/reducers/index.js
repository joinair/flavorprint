
import { combineReducers } from 'redux';

import fetching from './fetching';
import modal from './modal';
import notFound from './notFound';
import notifications from './notifications';
import preferences from './preferences';
import products from './products';
import recipes from './recipes';
import router from './router';
import sidebarMenu from './sidebarMenu';
import user from './user';

export default combineReducers({
  fetching,
  modal,
  notFound,
  notifications,
  preferences,
  products,
  recipes,
  router,
  sidebarMenu,
  user,
});
