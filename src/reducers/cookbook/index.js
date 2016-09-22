
import { combineReducers } from 'redux';

import collections from './collections';
import user from './user';

export default combineReducers({ collections, user });

// FIXME: FOLLOWERS
// import follows from './follows';
// follows,
