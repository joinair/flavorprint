
import { combineReducers } from 'redux';

import collections from './collections';
import cookbook from './cookbook';
import feed from './feed';
import fetching from './fetching';
import inventories from './inventories';
import modal from './modal';
import notFound from './notFound';
import notifications from './notifications';
import onlineCheckout from './onlineCheckout';
import peapod from './peapod';
import popularProducts from './popularProducts';
import preferences from './preferences';
import printList from './printList';
import recipes from './recipes';
import router from './router';
import searchPreferences from './searchPreferences';
import shoppingList from './shoppingList';
import shoppingListSidebar from './shoppingListSidebar';
import sidebarMenu from './sidebarMenu';
import tizen from './tizen';
import user from './user';

export default combineReducers({
  collections,
  cookbook,
  feed,
  fetching,
  inventories,
  modal,
  notFound,
  notifications,
  onlineCheckout,
  peapod,
  popularProducts,
  preferences,
  printList,
  recipes,
  router,
  searchPreferences,
  shoppingList,
  shoppingListSidebar,
  sidebarMenu,
  tizen,
  user,
});
