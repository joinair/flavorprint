
import get from 'lodash/get';

import {
  SELECT_RECIPE_REQUEST,
  SELECT_RECIPE_SUCCESS,
  SELECT_RECIPE_FAILURE,

  DESELECT_RECIPE_REQUEST,
  DESELECT_RECIPE_FAILURE,

  UPDATE_RECIPE_COLLECTIONS_REQUEST,
  UPDATE_RECIPE_COLLECTIONS_FAILURE,
} from 'actions/recipes';

export const matchRecipe = (recipe, id, url) =>
  id && recipe.id === id || url && recipe.externalUrl === url;

export default updateRecipe => {
  const restoreCollections = (state, action) =>
    updateRecipe(state, action,
      {
        cookbook: {
          saved: true,
          collectionIds: get(action, 'meta.previous.cookbook.collectionIds'),
        },
      }
    );

  return ({
    [SELECT_RECIPE_REQUEST]: (state, action) =>
      updateRecipe(state, action,
        { cookbook: { saved: true, collectionIds: [] } }),

    [SELECT_RECIPE_SUCCESS]: (state, action) =>
      updateRecipe(state, action, action.payload),

    [SELECT_RECIPE_FAILURE]: (state, action) =>
      updateRecipe(state, action,
        { cookbook: { saved: false, collectionIds: [] } }),

    [DESELECT_RECIPE_REQUEST]: (state, action) =>
      updateRecipe(state, action,
        { cookbook: { saved: false, collectionIds: [] } }),

    [DESELECT_RECIPE_FAILURE]: restoreCollections,

    [UPDATE_RECIPE_COLLECTIONS_REQUEST]: (state, action) =>
      updateRecipe(state, action,
        {
          cookbook: {
            saved: true,
            collectionIds: action.payload.cookbook.collectionIds,
          },
        }
      ),

    [UPDATE_RECIPE_COLLECTIONS_FAILURE]: restoreCollections,
  });
};
