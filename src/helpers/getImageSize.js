
export default (image, options) => {
  const { width, height } = image;
  const { pixelRatio } = options;

  let { maxWidth, maxHeight } = options;

  if (pixelRatio) {
    maxWidth *= pixelRatio;
    maxHeight *= pixelRatio;
  }

  if (!width && !height || width >= maxWidth && height >= maxHeight) {
    return {
      width: maxWidth,
      height: maxHeight,
    };
  }

  const contains = width < maxWidth && height < maxHeight;
  const containerRatio = maxWidth / maxHeight;

  if (contains) {
    return width / height > containerRatio
      ? {
        height,
        width: Math.round(height * containerRatio),
      } : {
        width,
        height: Math.round(width / containerRatio),
      };
  }

  if (height >= maxHeight && width < maxWidth) {
    return {
      width,
      height: Math.round(width / containerRatio),
    };
  }

  if (height < maxHeight && width >= maxWidth) {
    return {
      height,
      width: Math.round(height * containerRatio),
    };
  }

  return { width, height };
};
