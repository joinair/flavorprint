
import includes from 'lodash/includes';
import tail from 'lodash/tail';

import config from 'constants/Config';

const URI_RX = new RegExp('/image/upload/(.+)$');

const prefix =
  `https://${config.cloudinary.cloudName}-res.cloudinary.com/image/upload`;

const uriWithTransformation = (uri, transformation) => {
  const [postfix] = tail(URI_RX.exec(uri) || []);

  return (postfix && transformation)
    ? `${prefix}/${transformation}/${postfix}`
    : uri;
};

export const imageTransformation = (uri, transformation) => {
  if (!uri) { return undefined; }
  if (!transformation || includes(uri, transformation)) { return uri; }
  return uriWithTransformation(uri, transformation);
};

export const getSrc = (url, transformation) => {
  if (!url) return undefined;
  return imageTransformation(url, transformation);
};

export const getSrcSet = (url, transformation) =>
  getSrc(`${url} 2x`, transformation);

export const addGeometry = (transformation, geometry) => {
  const { width, height } = geometry;
  return `${transformation},w_${width},h_${height}`;
};

export default { addGeometry, getSrc, getSrcSet, imageTransformation };
