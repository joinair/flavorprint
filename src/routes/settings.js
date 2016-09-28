
import {
  PREFERENCES,
  SETTINGS,
} from 'constants/Routes';

import preferences from 'actions/preferences';

import redirectToAuthPage from './helpers/redirectToAuthPage';

import Settings from 'components/pages/Settings';

export default store => {
  const prepareData = () => store.dispatch(preferences.load());

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
  ];
};
