
import filter from 'lodash/filter';
import get from 'lodash/get';
import includes from 'lodash/includes';

import { CHAIN } from 'middleware/chain';

import {
  TYPE_BUBBLES,
  BUTTON_CONTINUE,
} from 'constants/Onboarding';

import {
  setState,
  answerQuestion as answer,
} from 'actions/onboarding';

const selector = state => get(state, 'onboarding.state.occasions', []);

const stepOccasions = () => ({
  type: TYPE_BUBBLES,
  title: 'What occasions do you usually cook for?',
  button: BUTTON_CONTINUE,

  columns: 3,
  large: true,
  bubbles: [
    { value: 'adults', text: 'Cook for Adults', image: 'quiz_occasion_cook_for_adults' },
    { value: 'kids', text: 'Cook for Kids', image: 'quiz_occasion_cook_for_kids' },
    { value: 'holidays', text: 'Cook for Holidays', image: 'quiz_occasion_cook_for_holidays' },
    { value: 'parties', text: 'Host Dinner Parties', image: 'quiz_occasion_host_dinner_parties' },
    { value: 'trips', text: 'Frequent grocery trips', image: 'quiz_occasion_frequent_grocery_trips' },
    { value: 'everyday', text: 'Cook every day', image: 'quiz_occasion_cook_every_day' },
  ],

  values: selector,

  onChange: value => (dispatch, getState) => {
    const values = selector(getState());

    const newValues = includes(values, value)
      ? filter(values, x => x !== value)
      : [...values, value];

    return dispatch(setState({ occasions: newValues }));
  },

  onNext: () => (dispatch, getState) => {
    const values = selector(getState());
    const has = type => includes(values, type);

    const adults = answer(
      '536917c15feee3e5105b1697',
      [has('adults') ? 'TWO' : 'SKIP']
    );

    const kids = answer(
      '536917c15feee3e5105b1698',
      [has('kids') ? 'THREE' : 'SKIP']
    );

    const holidays = answer(
      '536917c15feee3e5105b169e',
      [has('kids') ? 'YES' : 'SKIP']
    );

    const parties = answer(
      '536917c15feee3e5105b169d',
      [has('parties') ? 'YES' : 'SKIP']
    );

    const trips = answer(
      '536917c15feee3e5105b169c',
      [has('trips') ? 'FOUR' : 'SKIP']
    );

    const everyday = answer(
      '536917c15feee3e5105b1699',
      [has('everyday') ? 'SEVEN' : 'SKIP']
    );

    return dispatch({
      [CHAIN]: [
        () => adults,
        () => kids,
        () => holidays,
        () => parties,
        () => trips,
        () => everyday,
      ],
    });
  },
});

export default stepOccasions;
