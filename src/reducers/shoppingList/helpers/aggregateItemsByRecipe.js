
import { createSelector } from 'reselect';

import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';
import map from 'lodash/map';
import maxBy from 'lodash/maxBy';
import partition from 'lodash/partition';
import sortBy from 'lodash/sortBy';

const recipesSortingCriteria = groups => recipe =>
  -get(maxBy(groups[recipe], ({ createdAt }) => createdAt), 'createdAt', 0);

export default itemsSelector => createSelector(
  itemsSelector,

  items => {
    const [withRecipe, withoutRecipe] = partition(items, 'key.recipe');

    const withoutRecipeInfo = {
      items: sortBy(withoutRecipe, ({ createdAt }) => -createdAt),
    };

    const sorted = sortBy(withRecipe, 'groupOrder');
    const recipesGroups = groupBy(sorted, 'key.recipe');

    const sortedRecipes = sortBy(
      keys(recipesGroups),
      recipesSortingCriteria(recipesGroups)
    );

    const recipesInfos = map(sortedRecipes, recipe => ({
      id: recipe,
      items: recipesGroups[recipe],
    }));

    return withoutRecipe.length
      ? [withoutRecipeInfo, ...recipesInfos]
      : recipesInfos;
  }
);
