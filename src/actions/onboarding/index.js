
import Rx from 'rx';

import values from 'lodash/values';
import identity from 'lodash/identity';

import {
  RECIPES_SEED,
  QUESTIONS,
} from 'constants/Onboarding';

import * as recipes from './recipes';
import * as questions from './questions';
import * as common from './common';

export * from './recipes';
export * from './questions';
export * from './common';

export const loadOnboardingData = () => dispatch => {
  const recipes$ = dispatch(
    recipes.loadOnboardingRecipes(values(RECIPES_SEED))
  );

  const questions$ = dispatch(
    questions.loadOnboardingQuestions(values(QUESTIONS))
  );

  const array = [
    ...(recipes$ ? [recipes$] : []),
    ...(questions$ ? [questions$] : []),
  ];

  if (array.length) {
    return Rx.Observable.from(array).flatMap(identity);
  }

  return Rx.Observable.empty();
};

export default {
  ...recipes,
  ...questions,
  ...common,
  loadOnboardingData,
};
