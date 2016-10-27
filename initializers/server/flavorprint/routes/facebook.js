
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
    client_id: Config.facebook.id,
    client_secret: serverConfig.OAUTH_SECRET.FACEBOOK,
    redirect_uri: query.redirectUri,
    code: query.code,
  };

  request
    .get('https://graph.facebook.com/v2.7/oauth/access_token')
    .query(oauthQuery)
    .end((error, fbRes) => {
      if (error) {
        subject.onError();
      } else {
        request
          .get('https://graph.facebook.com/v2.7/me')
          .query({
            fields: 'id,email,first_name,last_name,picture,gender',
            access_token: fbRes.body.access_token,
          })
          .end((err, appRes) => {
            let body;
            try { body = JSON.parse(get(appRes, 'text')); } catch (e) { /* ... */ }

            if (err || !body) {
              return subject.onError();
            }

            let email = body.email;
            if (!email) email = `${body.id}@facebook.local`;

            const data = {
              firstName: body.first_name,
              lastName: body.last_name,
              avatarUrl: get(body, 'picture.data.url'),
              gender: { male: 'm', female: 'f' }[body.gender],
              email,
            };

            authorizeFromOauth(data, session.userId).subscribe(
              response => {
                subject.onNext({
                  headers: getSessionHeaders({ userId: response.body.id }),
                  body: formatUserResponse('facebook', response.body),
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
