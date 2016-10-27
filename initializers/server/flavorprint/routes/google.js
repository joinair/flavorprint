
import Rx from 'rx';

import request from 'superagent';

import get from 'lodash/get';

import Config from 'constants/Config';
import serverConfig from '../../serverConfig';
import {
  authorizeFromOauth,
  formatUserResponse,
} from '../actions/users';

import { getSessionHeaders } from '../sessionMiddleware';

export default ({ query, session }) => {
  const subject = new Rx.Subject();

  const oauthQuery = {
    client_id: Config.google.id,
    client_secret: serverConfig.OAUTH_SECRET.GOOGLE,
    redirect_uri: query.redirectUri,
    code: query.code,
    grant_type: 'authorization_code',
  };

  request
    .post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send(oauthQuery)
    .end((error, gglRes) => {
      if (error) {
        subject.onError();
      } else {
        const accessToken = get(gglRes, 'body.access_token');

        request
          .get('https://www.googleapis.com/plus/v1/people/me')
          .query({
            fields: 'id,image/url,emails,gender,name',
            access_token: accessToken,
          })
          .end((err, appRes) => {
            if (err) return subject.onError();

            const { body } = appRes;

            const email = get(
              body, 'emails.0.value',
              `${body.id}@google.local`
            );

            const data = {
              firstName: get(body, 'name.givenName'),
              lastName: get(body, 'name.familyName'),
              avatarUrl: get(body, 'image.url'),
              gender: { male: 'm', female: 'f' }[body.gender],
              email,
            };

            authorizeFromOauth(data, session.userId).subscribe(
              response => {
                subject.onNext({
                  headers: getSessionHeaders({ userId: response.body.id }),
                  body: formatUserResponse('google', response.body),
                });
                subject.onCompleted();
              },
              () => subject.onError()
            );
          });
      }
    });

  return subject;
};
