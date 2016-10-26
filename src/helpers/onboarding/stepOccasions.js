
import { QUESTIONS } from 'constants/Onboarding';

import stepQuestions from './stepQuestions';

export default stepQuestions({
  title: 'What occasions do you usually cook for?',

  options: {
    columns: 3,
    large: true,
  },

  bubbles: [
    {
      value: 'adults',
      text: 'Cook for Adults',
      image: 'quiz_occasion_cook_for_adults',
      questionId: QUESTIONS.howManyAdults,
      yesValue: 'TWO',
      noValue: 'ZERO',
    },
    {
      value: 'kids',
      text: 'Cook for Kids',
      image: 'quiz_occasion_cook_for_kids',
      questionId: QUESTIONS.howManyKids,
      yesValue: 'THREE',
      noValue: 'ZERO',
    },
    {
      value: 'holidays',
      text: 'Cook for Holidays',
      image: 'quiz_occasion_cook_for_holidays',
      questionId: QUESTIONS.cookForHolidays,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      value: 'parties',
      text: 'Host Dinner Parties',
      image: 'quiz_occasion_host_dinner_parties',
      questionId: QUESTIONS.cookForParties,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      value: 'trips',
      text: 'Frequent grocery trips',
      image: 'quiz_occasion_frequent_grocery_trips',
      questionId: QUESTIONS.cookForTrips,
      yesValue: 'FIVE',
      noValue: 'ONE',
    },
    {
      value: 'everyday',
      text: 'Cook every day',
      image: 'quiz_occasion_cook_every_day',
      questionId: QUESTIONS.cookDaysAWeek,
      yesValue: 'SEVEN',
      noValue: 'THREE',
    },
  ],
});
