
import { combineReducers } from 'redux';

import collections from './collections';
import feed from './feed';
import fetching from './fetching';
import modal from './modal';
import notFound from './notFound';
import notifications from './notifications';
import popularProducts from './popularProducts';
import preferences from './preferences';
import printList from './printList';
import products from './products';
import recipes from './recipes';
import router from './router';
import searchPreferences from './searchPreferences';
import sidebarMenu from './sidebarMenu';
import tizen from './tizen';
import user from './user';

export default combineReducers({
  collections,
  feed,
  fetching,
  modal,
  notFound,
  notifications,
  popularProducts,
  preferences,
  printList,
  products,
  recipes,
  router,
  searchPreferences,
  sidebarMenu,
  tizen,
  user,
});
