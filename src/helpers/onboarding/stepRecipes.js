
import some from 'lodash/some';
import pick from 'lodash/pick';
import values from 'lodash/values';

import {
  TYPE_RECIPES,
  BUTTON_SKIP,
} from 'constants/Onboarding';

export default (title, recipeIds) => state => {
  const recipes = values(pick(
    state.recipes,
    ...recipeIds
  ));

  const isFinished = some(
    recipes,
    ({ interactions }) => interactions.length > 0
  );

  return {
    type: TYPE_RECIPES,
    title: 'What would you prefer on a Sunday morning?',
    button: BUTTON_SKIP,
    isFinished,

    recipes,
  };
};

