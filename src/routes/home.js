
import values from 'lodash/values';

import { HOME } from 'constants/Routes';
import Home from 'components/pages/Home';

import { loadOnboardingData } from 'actions/onboarding';
import { RECIPES_SEED } from 'constants/Onboarding';

export default store => ({
  path: HOME,
  component: Home,
  analyticsTag: 'Recipe feed',

  prepareData() {
    return store.dispatch(
      loadOnboardingData(values(RECIPES_SEED))
    );
  },
});
