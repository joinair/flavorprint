
import intersection from 'lodash/intersection';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import some from 'lodash/some';

import { likeState } from 'helpers/interactions';

import {
  TYPE_RECIPES,
  BUTTON_SKIP,
} from 'constants/Onboarding';

export default (title, recipesData) => state => {
  const recipes = map(recipesData, recipe => ({
    ...state.recipes[recipe.sourceId],
    ...recipe,
  }));

  const isFinished = some(
    recipes,
    recipe => likeState(recipe) === 'liked'
  ) && isEmpty(
    intersection(
      state.selectedRecipes,
      map(recipes, 'sourceId')
    )
  );

  return {
    type: TYPE_RECIPES,
    title: 'What would you prefer on a Sunday morning?',
    button: BUTTON_SKIP,
    isFinished,

    recipes,
  };
};

