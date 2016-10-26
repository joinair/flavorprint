
import qs from 'qs';

import config from 'constants/Config';

export const oAuthRedirectURI = (query = '') => {
  const queryString = query.length > 0 ? `?${query}` : '';
  return `${config.domain}/oauth/google/callback${queryString}`;
};

export const oAuthLink = (query = '', state) =>
  `https://accounts.google.com/o/oauth2/v2/auth?${
    qs.stringify({
      scope: 'email profile',
      client_id: config.google.id,
      response_type: 'code',
      redirect_uri: oAuthRedirectURI(query),
      state,
    })
  }`;

export default { oAuthLink, oAuthRedirectURI };
