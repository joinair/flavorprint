
import config from 'constants/Config';
import qs from 'qs';

import { openPopupWindow } from 'helpers/popupWindow';

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

export const share = url => {
  const popupWindowPosition = require('helpers/popupWindowPosition').default;

  const width = 700;
  const height = 600;
  const { left, top } = popupWindowPosition(width, height);

  openPopupWindow(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    'Share: Facebook',
    'toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,' +
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

export default { oAuthLink, oAuthRedirectURI, share };
