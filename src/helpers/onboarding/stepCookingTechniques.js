
import { QUESTIONS } from 'constants/Onboarding';

import stepQuestions from './stepQuestions';

export default stepQuestions({
  title: 'What kind of cooking techniques do you like?',

  bubbles: [
    {
      text: 'Bake',
      image: 'quiz_techniques_bake',
      value: 'bake',
      questionId: QUESTIONS.bake,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Grill',
      image: 'quiz_techniques_grill',
      value: 'grill',
      questionId: QUESTIONS.grill,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Stir-Fry',
      image: 'quiz_techniques_stir_fry',
      value: 'stir_fry',
      questionId: QUESTIONS.stirFry,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Deep Fry',
      image: 'quiz_techniques_deep_fry',
      value: 'deep_fry',
      questionId: QUESTIONS.deepFry,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Smoke',
      image: 'quiz_techniques_smoke',
      value: 'smoke',
      questionId: QUESTIONS.smoke,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Preserve',
      image: 'quiz_techniques_preserve',
      value: 'preserve',
      questionId: QUESTIONS.preserve,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Roast',
      image: 'quiz_techniques_roast',
      value: 'roast',
      questionId: QUESTIONS.roast,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Puree',
      image: 'quiz_techniques_puree',
      value: 'puree',
      questionId: QUESTIONS.puree,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Sauté',
      image: 'quiz_techniques_saute',
      value: 'saute',
      questionId: QUESTIONS.saute,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
    {
      text: 'Poach',
      image: 'quiz_techniques_poach',
      value: 'poach',
      questionId: QUESTIONS.poach,
      yesValue: 'LIKE',
      noValue: 'DONT_LIKE',
    },
  ],
});
