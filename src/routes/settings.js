
import {
  PREFERENCES,
  SETTINGS,
} from 'constants/Routes';

import redirectToAuthPage from './helpers/redirectToAuthPage';

import Settings from 'components/pages/Settings';

export default store => {
  return [
    {
      path: SETTINGS,
      component: Settings,
      analyticsTag: 'Settings',
      onEnter: redirectToAuthPage(store),
    },
    {
      path: PREFERENCES,
      component: Settings,
      analyticsTag: 'Preferences',
      onEnter: redirectToAuthPage(store),
    },
  ];
};
