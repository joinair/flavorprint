
import get from 'lodash/get';
import filter from 'lodash/filter';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

export const recipeImageUrl = rec => {
  const minWidth = 580;
  const minHeight = 580;

  let imageUrls = get(rec, 'details.images', []);
  imageUrls = filter(imageUrls, 'link');

  const parsed = map(imageUrls, ({ size, link }) => ({
    link,
    size: map(size.split('x'), parseFloat),
  }));
  const sorted = sortBy(parsed, x => Math.min(x.size));

  const image = find(sorted, ({ size }) => (
    size[0] >= minWidth && size[1] >= minHeight
  ));

  return image || parsed[0];
};

export default {
  recipeImageUrl,
};
