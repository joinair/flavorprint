/* eslint no-param-reassign:0 */

import request from 'superagent';

import get from 'lodash/get';

import Config from 'constants/Config';
import serverConfig from '../../serverConfig';
import {
  authorizeFromOauth,
  formatUserResponse,
} from '../actions/users';


export default (req, res) => {
  const query = {
    client_id: Config.google.id,
    client_secret: serverConfig.OAUTH_SECRET.GOOGLE,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type: 'authorization_code',
  };

  const fail = (err) => res.status(401).end(JSON.stringify(err));

  request
    .post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send(query)
    .end((error, gglRes) => {
      if (error) {
        fail();
      } else {
        const accessToken = get(gglRes, 'body.access_token');

        request
          .get('https://www.googleapis.com/plus/v1/people/me')
          .query({
            fields: 'id,image/url,emails,gender,name',
            access_token: accessToken,
          })
          .end((err, appRes) => {
            if (err) return fail();

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

            authorizeFromOauth(data, req.session.userId).subscribe(
              response => {
                req.setSession({ userId: response.body.id });
                res.append('Content-Type', 'application/json');
                res.end(formatUserResponse('google', response.body));
              },
              fail
            );
          });
      }
    });
};

