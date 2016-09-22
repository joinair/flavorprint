
import get from 'lodash/get';

import { openPopupWindow } from 'helpers/popupWindow';

export const profileToConfig = profile => ({
  text: `${profile.firstName}'s cookbook on Whisk.com`,
});

export const recipeToConfig = recipe => ({
  text: `${get(recipe, 'data.name')} via @WhiskTeam`,
});

export const share = (url, config) => {
  const popupWindowPosition = require('helpers/popupWindowPosition').default;

  const width = 700;
  const height = 500;
  const { left, top } = popupWindowPosition(width, height);

  const { text } = config;

  openPopupWindow(
    'http://twitter.com/intent/tweet' +
      `?text=${encodeURIComponent(text)}&original_referer=${url}&url=${url}`,
    'Share: Twitter',
    'toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,' +
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

export default { profileToConfig, recipeToConfig, share };
