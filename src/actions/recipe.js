
import { API_CALL } from 'middleware/API';

import config from 'constants/Config';

import images from './images';

export const RESET_RECIPE = 'RESET_RECIPE';

export const DESTROY_RECIPE_REQUEST = 'DESTROY_RECIPE_REQUEST';
export const DESTROY_RECIPE_SUCCESS = 'DESTROY_RECIPE_SUCCESS';
export const DESTROY_RECIPE_FAILURE = 'DESTROY_RECIPE_FAILURE';

export const LOAD_RECIPE_REQUEST = 'LOAD_RECIPE_REQUEST';
export const LOAD_RECIPE_SUCCESS = 'LOAD_RECIPE_SUCCESS';
export const LOAD_RECIPE_FAILURE = 'LOAD_RECIPE_FAILURE';

export const LOAD_ALTERNATIVE_RECIPES_REQUEST = 'LOAD_ALTERNATIVE_RECIPES_REQUEST';
export const LOAD_ALTERNATIVE_RECIPES_SUCCESS = 'LOAD_ALTERNATIVE_RECIPES_SUCCESS';
export const LOAD_ALTERNATIVE_RECIPES_FAILURE = 'LOAD_ALTERNATIVE_RECIPES_FAILURE';

export const SAVE_RECIPE_REQUEST = 'SAVE_RECIPE_REQUEST';
export const SAVE_RECIPE_SUCCESS = 'SAVE_RECIPE_SUCCESS';
export const SAVE_RECIPE_FAILURE = 'SAVE_RECIPE_FAILURE';

export const UPLOAD_RECIPE_IMAGE_REQUEST = 'UPLOAD_RECIPE_IMAGE_REQUEST';
export const UPLOAD_RECIPE_IMAGE_SUCCESS = 'UPLOAD_RECIPE_IMAGE_SUCCESS';
export const UPLOAD_RECIPE_IMAGE_FAILURE = 'UPLOAD_RECIPE_IMAGE_FAILURE';

export const reset = () => ({ type: RESET_RECIPE });

export const destroy = id => ({
  meta: {
    id,
    authenticationRequired: true,
  },

  [API_CALL]: {
    endpoint: `/cookbook/recipes/${id}`,
    method: 'DELETE',
    types: [
      DESTROY_RECIPE_REQUEST,
      DESTROY_RECIPE_SUCCESS,
      DESTROY_RECIPE_FAILURE,
    ],
  },
});

export const load = id => ({
  [API_CALL]: {
    endpoint: `/cookbook/recipes/${id}`,
    types: [
      LOAD_RECIPE_REQUEST,
      LOAD_RECIPE_SUCCESS,
      LOAD_RECIPE_FAILURE,
    ],
  },
});

export const loadFromPartners = url => ({
  [API_CALL]: {
    endpoint: '/recipes/_details',
    query: { url },
    types: [
      LOAD_RECIPE_REQUEST,
      LOAD_RECIPE_SUCCESS,
      LOAD_RECIPE_FAILURE,
    ],
  },
});

export const loadAlternativeRecipes = identifier => ({
  payload: { id: identifier },

  [API_CALL]: {
    endpoint: '/recipes/_similar',
    query: { id: identifier },
    types: [
      LOAD_ALTERNATIVE_RECIPES_REQUEST,
      LOAD_ALTERNATIVE_RECIPES_SUCCESS,
      LOAD_ALTERNATIVE_RECIPES_FAILURE,
    ],
  },
});

export const save = ({ id, data, externalUrl }) => {
  const endpoint = id
    ? `/cookbook/recipes/${id}`
    : '/cookbook/recipes/';

  return {
    meta: {
      authenticationRequired: true,
      isNew: !id,
    },

    [API_CALL]: {
      endpoint,
      method: 'POST',
      query: { externalUrl, data },
      types: [
        SAVE_RECIPE_REQUEST,
        SAVE_RECIPE_SUCCESS,
        SAVE_RECIPE_FAILURE,
      ],
    },
  };
};

export const importByUrl = externalUrl => save({ externalUrl });

export const uploadImage = image =>
  images.uploadImage(
    image,
    config.cloudinary.recipesPreset,
    [
      UPLOAD_RECIPE_IMAGE_REQUEST,
      UPLOAD_RECIPE_IMAGE_SUCCESS,
      UPLOAD_RECIPE_IMAGE_FAILURE,
    ]
  );

export default {
  reset,
  destroy,

  load,
  loadFromPartners,
  loadAlternativeRecipes,
  save,

  importByUrl,

  uploadImage,
};
