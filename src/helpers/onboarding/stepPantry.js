
import { QUESTIONS } from 'constants/Onboarding';

import stepQuestions from './stepQuestions';

export default stepQuestions({
  title: 'What do you usually have in your pantry?',

  bubbles: [
    {
      text: 'Onions',
      image: 'quiz_pantry_onion',
      value: 'onion',
      questionId: QUESTIONS.onions,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Eggs',
      image: 'quiz_pantry_eggs',
      value: 'eggs',
      questionId: QUESTIONS.eggs,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Olive Oil',
      image: 'quiz_pantry_olive_oil',
      value: 'olive_oil',
      questionId: QUESTIONS.oliveOil,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Fresh Garlic',
      image: 'quiz_pantry_fresh_garlic',
      value: 'fresh_garlic',
      questionId: QUESTIONS.freshGarlic,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Brown Sugar',
      image: 'quiz_pantry_brown_sugar',
      value: 'brown_sugar',
      questionId: QUESTIONS.brownSugar,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Vanilla Extract',
      image: 'quiz_pantry_vanilla_extract',
      value: 'vanilla_extract',
      questionId: QUESTIONS.vanillaExtract,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Cinnamon',
      image: 'quiz_pantry_cinnamon',
      value: 'cinnamon',
      questionId: QUESTIONS.cinnamon,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Honey',
      image: 'quiz_pantry_honey',
      value: 'honey',
      questionId: QUESTIONS.honey,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Rice',
      image: 'quiz_pantry_rice',
      value: 'rice',
      questionId: QUESTIONS.rice,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Lettuce',
      image: 'quiz_pantry_lettuce',
      value: 'lettuce',
      questionId: QUESTIONS.lettuce,
      yesValue: 'YES',
      noValue: 'NO',
    },
  ],
});
