
import {
  PREFERENCES,
  SETTINGS,
} from 'constants/Routes';

import Settings from 'components/pages/Settings';

export default store => [
  {
    path: SETTINGS,
    component: Settings,
    analyticsTag: 'Settings',
  },
  {
    path: PREFERENCES,
    component: Settings,
    analyticsTag: 'Preferences',
  },
];
