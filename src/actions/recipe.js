
import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

import { loadRecipesCompatibilities } from 'actions/recipes';

export const LIKE_RECIPE_REQUEST = 'LIKE_RECIPE_REQUEST';
export const LIKE_RECIPE_SUCCESS = 'LIKE_RECIPE_SUCCESS';
export const LIKE_RECIPE_FAILURE = 'LIKE_RECIPE_FAILURE';

export const DISLIKE_RECIPE_REQUEST = 'DISLIKE_RECIPE_REQUEST';
export const DISLIKE_RECIPE_SUCCESS = 'DISLIKE_RECIPE_SUCCESS';
export const DISLIKE_RECIPE_FAILURE = 'DISLIKE_RECIPE_FAILURE';

const interactWithRecipe = (interaction, types) => ({ sourceId }) => ({
  [CHAIN]: [
    {
      payload: { sourceId },

      [API_CALL]: {
        endpoint: '/custom/users/interactions',
        method: 'POST',
        query: { interaction, sourceId },
        types,
      },
    },
    () => loadRecipesCompatibilities(),
  ],
});

export const likeRecipe = interactWithRecipe('LIKE', [
  LIKE_RECIPE_REQUEST,
  LIKE_RECIPE_SUCCESS,
  LIKE_RECIPE_FAILURE,
]);

export const dislikeRecipe = interactWithRecipe('DISLIKE_FLAVOR', [
  DISLIKE_RECIPE_REQUEST,
  DISLIKE_RECIPE_SUCCESS,
  DISLIKE_RECIPE_FAILURE,
]);

export default {
  DISLIKE_RECIPE_REQUEST,
  DISLIKE_RECIPE_SUCCESS,
  DISLIKE_RECIPE_FAILURE,

  LIKE_RECIPE_REQUEST,
  LIKE_RECIPE_SUCCESS,
  LIKE_RECIPE_FAILURE,

  likeRecipe,
};
