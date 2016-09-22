
import {
  PREFERENCES,
  SETTINGS,
  SETTINGS_MORE,
} from 'constants/Routes';

import { platformPickLazy } from 'helpers/platformPick';

import preferences from 'actions/preferences';
import feed from 'actions/feed';

import redirectToAuthPage from './helpers/redirectToAuthPage';

import Settings from 'components/pages/Settings';

export default store => {
  const prepareData = () => {
    platformPickLazy({
      mobile: () => store.dispatch(feed.clean()),
      default: () => {},
    });

    return store.dispatch(preferences.load());
  };

  const mobileRoutes = platformPickLazy({
    mobile: () => [
      {
        path: SETTINGS_MORE,
        component: Settings,
        analyticsTag: 'Settings More',
        onEnter: redirectToAuthPage(store),
        prepareData,
      },
    ],

    default: () => [],
  });

  return [
    {
      path: SETTINGS,
      component: Settings,
      analyticsTag: 'Settings',
      onEnter: redirectToAuthPage(store),
      prepareData,
    },
    {
      path: PREFERENCES,
      component: Settings,
      analyticsTag: 'Preferences',
      onEnter: redirectToAuthPage(store),
      prepareData,
    },
    ...mobileRoutes,
  ];
};
