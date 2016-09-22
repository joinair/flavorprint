
import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

import config from 'constants/Config';

export const uploadImage = (image, preset, types, handler) => {
  const timestamp = (Date.now() / 1000) | 0;
  const uploadAction = {
    [API_CALL]: {
      url: config.cloudinary.url,
      endpoint: '/image/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        timestamp,
        upload_preset: preset,
        file: image,
        api_key: config.cloudinary.apiKey,
      },
      types,
    },
  };

  return handler
    ? { [CHAIN]: [uploadAction, handler] }
    : uploadAction;
};

export default { uploadImage };
