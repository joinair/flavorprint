
import Rx from 'rx';
import request from 'superagent';
import qs from 'qs';

import {
  FLAVORPRINT_API_URL,
  FLAVORPRINT_API_KEY,
} from '../serverConfig';

const sendMethod = HTTPMethod =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? 'send'
    : 'query';

const sendArguments = (HTTPMethod, query) =>
  (HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch')
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' });

export default ({ method, query, endpoint }) => {
  const subject = new Rx.AsyncSubject();
  const url = FLAVORPRINT_API_URL;
  const headers = {
    'x-api-key': FLAVORPRINT_API_KEY,
  };

  request
    [method](url + endpoint)
    [sendMethod(method)](sendArguments(method, query))
    .type('json')
    .set(headers)
    .end((error, apiRes) => {
      if (error) {
        subject.onError(error);
      } else {
        subject.onNext(apiRes);
        subject.onCompleted();
      }
    });

  return subject;
};
