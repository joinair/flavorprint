
import assign from 'lodash/assign';
import get from 'lodash/get';

export default (state, action, extra = {}) => {
  const id = get(action, 'payload.id');
  const url = get(action, 'payload.externalUrl');
  const recipeId = url || id;

  if (!(recipeId && state.recipes[recipeId])) { return state; }

  const recipe = assign({}, state.recipes[recipeId], extra);
  const recipes = assign({}, state.recipes, { [recipeId]: recipe });

  return assign({}, state, { recipes });
};
