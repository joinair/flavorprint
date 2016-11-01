
import initialLoad from 'helpers/initialLoad';

import { HOME } from 'constants/Routes';
import Home from 'components/pages/Home';

import { loadOnboardingData } from 'actions/onboarding';

export default store => ({
  path: HOME,
  component: Home,
  analyticsTag: 'Recipe feed',

  prepareData() {
    if (initialLoad()) { return undefined; }

    return store.dispatch(loadOnboardingData());
  },
});
