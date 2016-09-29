
import get from 'lodash/get';

import { logo } from 'constants/SharingMeta';

import { openPopupWindow } from 'helpers/popupWindow';

export const profileToConfig = profile => {
  const imgUrl = get(profile, 'avatarUrl', logo);

  return ({
    media: imgUrl,
    description: encodeURIComponent(`${profile.firstName}'s cookbook on Whisk.com`),
  });
};

export const recipeToConfig = recipe => {
  const title = get(recipe, 'data.name');
  const description = get(recipe, 'data.description');
  const imgUrl = get(recipe, 'data.image.url', logo);

  return ({
    media: imgUrl,
    description: encodeURIComponent(
      get(recipe, 'externalUrl') ? title : `${title} - ${description}`
    ),
  });
};

export const share = (url, config) => {
  const popupWindowPosition = require('helpers/popupWindowPosition').default;

  const width = 800;
  const height = 600;
  const { left, top } = popupWindowPosition(width, height);

  const { description, media } = config;

  openPopupWindow(
    'https://pinterest.com/pin/create/button/' +
      `?url=${url}&description=${description}&media=${media}`,
    'Share: Pinterest',
    'toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,' +
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

export default { profileToConfig, recipeToConfig, share };
