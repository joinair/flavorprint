
import config from 'constants/Config';
import qs from 'qs';

export const oAuthRedirectURI = (query = '') => {
  const queryString = query.length > 0 ? `?${query}` : '';
  return `${config.domain}/oauth/facebook/callback${queryString}`;
};

export const oAuthLink = (query = '', state) =>
  `https://www.facebook.com/dialog/oauth?${
    qs.stringify({
      scope: 'email',
      client_id: config.facebook.id,
      redirect_uri: oAuthRedirectURI(query),
      state,
    })
  }`;

export default { oAuthLink, oAuthRedirectURI };
