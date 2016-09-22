
import includes from 'lodash/includes';

import { imageTransformation } from 'helpers/cloudinary';

export const avatarURL = (url, width, height) => {
  if (!url) return undefined;

  if (includes(url, 'cloudinary')) {
    const transformation = `c_fill,w_${width},h_${height},f_auto`;

    return {
      src: imageTransformation(url, transformation),
      srcSet: imageTransformation(`${url} 2x`, `${transformation},dpr_2.0`),
      scales: {
        '1x': imageTransformation(url, transformation),
        '2x': imageTransformation(url, `${transformation},dpr_2.0`),
        '3x': imageTransformation(url, `${transformation},dpr_3.0`),
      },
    };
  }

  if (includes(url, 'facebook')) {
    return {
      src: `${url}?width=${width}&height=${height}`,
      srcSet: `${url}?width=${width * 2}&height=${height * 2} 2x`,
      scales: {
        '1x': `${url}?width=${width}&height=${height}`,
        '2x': `${url}?width=${width * 2}&height=${height * 2}`,
        '3x': `${url}?width=${width * 3}&height=${height * 3}`,
      },
    };
  }

  if (includes(url, 'google')) {
    return {
      src: `${url}?sz=${width}`,
      srcSet: `${url}?sz=${width * 2} 2x`,
      scales: {
        '1x': `${url}?sz=${width}`,
        '2x': `${url}?sz=${width * 2}`,
        '3x': `${url}?sz=${width * 3}`,
      },
    };
  }
};

export default { avatarURL };
