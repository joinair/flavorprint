
import Rx from 'rx';

import identity from 'lodash/identity';
import keys from 'lodash/keys';
import map from 'lodash/map';

import apiClient from '../../apiClient';
import { sendJson } from '../../helpers';

import { normalizeEntities } from 'helpers/reducer';

const loadQuestions = (questionIds, userId) =>
  apiClient({
    method: 'get',
    query: {
      size: questionIds.length,
      questionIds: questionIds.join(','),
    },
    endpoint: `/v3/users/${userId}/preferences`,
  })
  .map(x => x.text)
  .map(JSON.parse)
  .map(x => x.content)
  .map(x => normalizeEntities(x, 'questionId'));

const changeAnswer = (userId, id) => ({ questionId, answer }) =>
  apiClient({
    method: 'put',
    endpoint: `/v3/users/${userId}/preferences/${id}`,
    query: {
      questionId,
      answers: [answer],
    },
  })
  .map(x => JSON.parse(x.text));


const createAnswer = userId => ({ questionId, answer }) =>
  apiClient({
    method: 'post',
    endpoint: `/v3/users/${userId}/preferences`,
    query: {
      questionId,
      answers: [answer],
    },
  })
  .map(x => JSON.parse(x.text));

const handleAnswers = (previousAnswers, answers, userId) => {
  const handlers = map(answers, (ans, key) => {
    const prevAns = previousAnswers[key];
    const handler = prevAns
      ? changeAnswer(userId, prevAns.id)
      : createAnswer(userId);

    return handler({ questionId: key, answer: ans });
  });

  return Rx.Observable
    .from(handlers)
    .flatMap(identity)
    .bufferWithCount(handlers.length)
    .map(x => normalizeEntities(x, 'questionId'));
};

export const load = (req, res) =>
  loadQuestions(req.query.questionIds, req.session.userId)
  .map(JSON.stringify)
  .subscribe(
    sendJson(res),
    err => res.status(500).end(JSON.stringify(err))
  );

export const answer = (req, res) =>
  loadQuestions(keys(req.body), req.session.userId)
  .flatMap(pa => handleAnswers(pa, req.body, req.session.userId))
  .map(JSON.stringify)
  .subscribe(
    sendJson(res),
    err => res.status(500).end(JSON.stringify(err))
  );

export default {
  load,
  answer,
};
