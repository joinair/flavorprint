
import { API_CALL } from 'middleware/API';

export const LOAD_INTERACTIONS_REQUEST = 'LOAD_INTERACTIONS_REQUEST';
export const LOAD_INTERACTIONS_SUCCESS = 'LOAD_INTERACTIONS_SUCCESS';
export const LOAD_INTERACTIONS_FAILURE = 'LOAD_INTERACTIONS_FAILURE';

export const loadInteractions = () => ({
  [API_CALL]: {
    endpoint: '/custom/users/interactions',
    method: 'GET',
    types: [
      LOAD_INTERACTIONS_REQUEST,
      LOAD_INTERACTIONS_SUCCESS,
      LOAD_INTERACTIONS_FAILURE,
    ],
  },
});

export default {
  loadInteractions,
};
