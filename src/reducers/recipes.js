
import assign from 'lodash/assign';
import get from 'lodash/get';
import map from 'lodash/map';
import omit from 'lodash/omit';
import reduce from 'lodash/reduce';

import createReducer from 'helpers/createReducer';
import handleRecipeSelection from 'helpers/handleRecipeSelection';

import {
  DESTROY_RECIPE_SUCCESS,
  LOAD_ALTERNATIVE_RECIPES_SUCCESS,
  LOAD_RECIPE_SUCCESS,
  RESET_RECIPE,
  SAVE_RECIPE_SUCCESS,
} from 'actions/recipe';

const initialState = {
  entries: {
    new: {
      alternativeRecipes: {
        entries: [],
        paging: [],
      },

      data: {
        name: '',
        description: '',
        durations: {},
        recipeYield: null,
        image: null,

        ingredients: [],
        instructions: [],
      },
    },
  },
};

const buildRecipe = (...data) => assign({
  alternativeRecipes: {
    entries: [],
    paging: [],
  },
  data: { },
}, ...data);

const getKey = recipe =>
  get(recipe, 'externalUrl', get(recipe, 'id'));

const modifyRecipe = (state, key, extra) => {
  const { entries } = state;
  const recipe = entries[key];
  const modifiedEntries = assign({}, entries, {
    [key]: buildRecipe(recipe, extra),
  });
  return assign({}, state, { entries: modifiedEntries });
};

const loadRecipeSuccess = (state, action) => {
  const { payload } = action;
  const key = getKey(payload);
  if (!key) { return state; }
  return modifyRecipe(state, key, payload);
};

const loadAlternativeRecipesSuccess = (state, action) => {
  const { payload } = action;
  const { id, paging, values } = payload;

  const shortList = map(values, x => x.externalUrl || x.id);

  const state1 = modifyRecipe(state, id, {
    alternativeRecipes: { paging, entries: shortList },
  });
  const state2 = reduce(
    values,
    (acc, recipe) => modifyRecipe(acc, getKey(recipe), recipe),
    state1
  );

  return state2;
};

const destroyRecipeSuccess = (state, action) =>
  assign({}, state, {
    entries: omit(state.entries, action.payload.meta),
  });

const resetRecipe = (state) => assign({}, state, {
  entries: assign({}, state.entries, initialState.entries),
});

const updateRecipe = (state, action, extra = {}) => {
  const id = get(action, 'payload.id');
  const externalUrl = get(action, 'payload.externalUrl');

  if (!(id || externalUrl)) { return state; }

  const key = externalUrl || id;

  const recipe = state.entries[key];

  const entries = assign({}, state.entries, {
    [key]: assign({ id, externalUrl }, recipe, extra),
  });

  return assign({}, state, { entries });
};

const handlers = assign({
  [RESET_RECIPE]: resetRecipe,
  [SAVE_RECIPE_SUCCESS]: loadRecipeSuccess,
  [LOAD_RECIPE_SUCCESS]: loadRecipeSuccess,
  [LOAD_ALTERNATIVE_RECIPES_SUCCESS]: loadAlternativeRecipesSuccess,
  [DESTROY_RECIPE_SUCCESS]: destroyRecipeSuccess,
}, handleRecipeSelection(updateRecipe));

export default createReducer(initialState, handlers);
