
import { API_CALL } from 'middleware/API';

export const LOAD_ONBOARDING_QUESTIONS_REQUEST = 'LOAD_ONBOARDING_QUESTIONS_REQUEST';
export const LOAD_ONBOARDING_QUESTIONS_SUCCESS = 'LOAD_ONBOARDING_QUESTIONS_SUCCESS';
export const LOAD_ONBOARDING_QUESTIONS_FAILURE = 'LOAD_ONBOARDING_QUESTIONS_FAILURE';

export const ONBOARDING_ANSWER_QUESTION_REQUEST = 'ONBOARDING_ANSWER_QUESTION_REQUEST';
export const ONBOARDING_ANSWER_QUESTION_SUCCESS = 'ONBOARDING_ANSWER_QUESTION_SUCCESS';
export const ONBOARDING_ANSWER_QUESTION_FAILURE = 'ONBOARDING_ANSWER_QUESTION_FAILURE';

export const ONBOARDING_MARK_ANSWER = 'ONBOARDING_MARK_ANSWER';

export const loadOnboardingQuestions = questionIds => ({
  [API_CALL]: {
    endpoint: '/custom/onboarding/questions',
    query: { questionIds },
    types: [
      LOAD_ONBOARDING_QUESTIONS_REQUEST,
      LOAD_ONBOARDING_QUESTIONS_SUCCESS,
      LOAD_ONBOARDING_QUESTIONS_FAILURE,
    ],
  },
});

export const markAnswer = (questionId, mark) => ({
  type: ONBOARDING_MARK_ANSWER,
  payload: { questionId, mark },
});

export const answerQuestion = query => ({
  [API_CALL]: {
    endpoint: '/custom/onboarding/questions',
    method: 'POST',
    query,
    types: [
      ONBOARDING_ANSWER_QUESTION_REQUEST,
      ONBOARDING_ANSWER_QUESTION_SUCCESS,
      ONBOARDING_ANSWER_QUESTION_FAILURE,
    ],
  },
});
