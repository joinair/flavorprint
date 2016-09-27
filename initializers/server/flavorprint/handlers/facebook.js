/* eslint no-param-reassign:0 */

import request from 'superagent';

import get from 'lodash/get';

import Config from '../../../../src/constants/Config';
import config from '../../../config';
import { loadOrCreateUser } from '../actions/users';

export default (req, res) => {
  const query = {
    client_id: Config.facebook.id,
    client_secret: config.OAUTH_SECRET.FACEBOOK,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
  };

  const fail = (err) => res.status(401).end(JSON.stringify(err));

  request
    .get('https://graph.facebook.com/v2.7/oauth/access_token')
    .query(query)
    .end((error, fbRes) => {
      if (error) {
        fail();
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
              return fail();
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

            loadOrCreateUser(data).subscribe(
              response => {
                req.session.userId = response.body.id;

                res.end(JSON.stringify({
                  provider: 'facebook',
                  data: response.body,
                  success: true,
                }));
              },
              fail
            );
          });
      }
    });
};

