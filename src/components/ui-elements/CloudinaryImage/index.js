
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import {
  addGeometry, getSrc, getSrcSet, imageTransformation,
} from 'helpers/cloudinary';
import getImageSize from 'helpers/getImageSize';

const uri = (url, transformation) =>
  imageTransformation(url, transformation);

const retinaUri = (url, transformation) =>
  imageTransformation(`${url} 2x`, `${transformation},dpr_2.0`);

const CloudinaryImage = ({
  image, url, maxWidth, maxHeight, title,
  transformation, className,
  onClick,
}) => {
  let src;
  let srcSet;

  if (image) {
    const options = { maxWidth, maxHeight };
    const retinaOptions = { maxWidth, maxHeight, pixelRatio: 2 };

    const geometry = getImageSize(image, options);
    const retinaGeometry = getImageSize(image, retinaOptions);
    const passSrcSet = (retinaGeometry.width / geometry.width) >= 1.6;

    src = getSrc(image.url, addGeometry(transformation, geometry));
    srcSet = passSrcSet
      ? getSrcSet(image.url, addGeometry(transformation, retinaGeometry))
      : '';
  } else {
    src = uri(url, transformation);
    srcSet = retinaUri(url, transformation);
  }

  return (
    <img
      alt={title || ''}
      className={classnames('CloudinaryImage', className)}
      src={src}
      srcSet={srcSet}
      title={title}
      onClick={onClick}
    />
  );
};

CloudinaryImage.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
  }),
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  title: PropTypes.string,
  transformation: PropTypes.string.isRequired,
  url: PropTypes.string,
  onClick: PropTypes.func,
};

export default CloudinaryImage;
