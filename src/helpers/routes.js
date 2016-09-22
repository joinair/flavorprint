
import merge from 'lodash/merge';

export const recipePageRoute = (recipe, extra) => {
  const { externalUrl, id } = recipe;

  if (externalUrl) {
    return merge({
      path: 'recipes/from-partners',
      // query: { url: externalUrl },
      query: { url: 'http://www.deliciousmagazine.co.uk/recipes/chicken-chasseur/' },
    }, extra);
  }

  if (id) {
    return merge({
      path: `recipes/${id}`,
    }, extra);
  }
};

export default { recipePageRoute };
