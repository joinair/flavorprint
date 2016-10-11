
import Rx from 'rx';

import identity from 'lodash/identity';
import map from 'lodash/map';

import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

const SIZE = 10;
const CACHE_SIZE = 100;

export default function buildRecommendationsActions({
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  LOAD_MORE_REQUEST,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_FAILURE,
  LOAD_FROM_CACHE,
  LOAD_DETAILS_REQUEST,
  LOAD_DETAILS_SUCCESS,
  LOAD_DETAILS_FAILURE,

  recommendationsSelector,
  cacheSelector,
  type,
}) {
  const loadFromCache = () => ({
    type: LOAD_FROM_CACHE,
    payload: {
      size: SIZE,
    },
  });

  const load = (params = {}) => (dispatch, getState) => {
    const endpoint = `/custom/recommendations/${params.userId}`;
    const more = !!params.more;

    const state = getState();
    const recipes = recommendationsSelector(state);

    if (more) {
      const cacheSize = cacheSelector(state).length;
      const ds = Math.max(0, SIZE - cacheSize);
      if (ds <= 0) {
        return dispatch(loadFromCache());
      }
    }

    const ignore = recipes.length
      ? map(recipes, x => x.sourceId).join(',')
      : undefined;

    return dispatch({
      meta: { cacheFrom: SIZE },

      [API_CALL]: {
        endpoint,
        query: {
          type,
          size: CACHE_SIZE,
          ignore,
        },
        types: more ? [
          LOAD_MORE_REQUEST,
          LOAD_MORE_SUCCESS,
          LOAD_MORE_FAILURE,
        ] : [
          LOAD_REQUEST,
          LOAD_SUCCESS,
          LOAD_FAILURE,
        ],
      },
    });
  };

  const loadDetails = recipe => ({
    payload: { recipeId: recipe.sourceId, recipe },

    [API_CALL]: {
      endpoint: '',
      url: recipe.detailUrl,
      types: [
        LOAD_DETAILS_REQUEST,
        LOAD_DETAILS_SUCCESS,
        LOAD_DETAILS_FAILURE,
      ],
    },
  });

  const loadDetailed = params => ({
    [CHAIN]: [
      () => load(params),
      () => (dispatch, getState) => Rx.Observable.from(
        map(
          recommendationsSelector(getState()),
          x => dispatch(loadDetails(x))
        )
      ).flatMap(identity),
    ],
  });

  return {
    load,
    loadDetails,
    loadDetailed,
  };
}
