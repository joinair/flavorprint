
import qs from 'qs';

import config from 'constants/Config';

import { openPopupWindow } from 'helpers/popupWindow';

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

export const share = url => {
  const popupWindowPosition = require('helpers/popupWindowPosition').default;

  const width = 500;
  const height = 650;
  const { left, top } = popupWindowPosition(width, height);

  openPopupWindow(
    `https://plus.google.com/share?url=${url}`,
    'Share: Google Plus',
    'toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,' +
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

export default { oAuthLink, oAuthRedirectURI, share };
