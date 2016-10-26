
import Rx from 'rx';

import values from 'lodash/values';
import identity from 'lodash/identity';

import { HOME } from 'constants/Routes';
import Home from 'components/pages/Home';

import {
  loadOnboardingQuestions,
  loadOnboardingRecipes,
} from 'actions/onboarding';

import {
  RECIPES_SEED,
  QUESTIONS,
} from 'constants/Onboarding';

export default store => ({
  path: HOME,
  component: Home,
  analyticsTag: 'Recipe feed',

  prepareData() {
    const recipes$ = store.dispatch(
      loadOnboardingRecipes(values(RECIPES_SEED))
    );

    const questions$ = store.dispatch(
      loadOnboardingQuestions(values(QUESTIONS))
    );

    return Rx.Observable
      .from([recipes$, questions$])
      .flatMap(identity);
  },
});
