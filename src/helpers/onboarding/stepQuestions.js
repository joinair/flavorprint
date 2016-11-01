
import assign from 'lodash/assign';
import every from 'lodash/every';
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import {
  markAnswer,
  answerQuestion,
} from 'actions/onboarding';

import {
  TYPE_BUBBLES,
  BUTTON_CONTINUE,
  BUTTON_SKIP,
} from 'constants/Onboarding';

const stepQuestions = ({
  title,
  bubbles,
  options,
}) => state => {
  const { questions } = state;

  const isFinished = every(bubbles, b => {
    const question = questions[b.questionId];
    return question && !('mark' in question);
  });

  const values = map(filter(bubbles, ({ yesValue, questionId }) => {
    const question = questions[questionId];
    return question &&
      ('mark' in question
        ? question.mark
        : question.answers[0] === yesValue);
  }), b => b.value);

  const onChange = value => {
    const bubble = find(bubbles, { value });
    const marked = values.indexOf(value) >= 0;
    return markAnswer(bubble.questionId, !marked);
  };

  const onNext = () => {
    const has = type => includes(values, type);

    const answers = map(bubbles, bubble => ({
      [bubble.questionId]: has(bubble.value)
        ? bubble.yesValue
        : bubble.noValue,
    }));

    return answerQuestion(reduce(answers, assign, {}));
  };

  return {
    ...options,
    type: TYPE_BUBBLES,
    title,
    button: values.length ? BUTTON_CONTINUE : BUTTON_SKIP,
    isFinished,

    bubbles,

    values,
    onChange,
    onNext,
  };
};

export default stepQuestions;
