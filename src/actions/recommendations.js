
import Rx from 'rx';

import identity from 'lodash/identity';
import map from 'lodash/map';
import { API_CALL } from 'middleware/API';
import { CHAIN } from 'middleware/chain';

const SIZE = 8;

export const loadRecommendations = types => ({ type, ignore }) => ({
  [API_CALL]: {
    endpoint: '/custom/recommendations',
    query: {
      type,
      size: SIZE,
      ignore,
    },
    types,
  },
});

export const loadDetails = types => recommendation => ({
  payload: {
    sourceId: recommendation.sourceId,
    recommendation,
  },

  [API_CALL]: {
    endpoint: '',
    url: recommendation.detailUrl,
    types,
  },
});

export const loadDetailedRecommendations = (loadRecs, loadDet) => params => ({
  [CHAIN]: [
    () => loadRecs(params),
    recommendations => dispatch => Rx.Observable.from(
      map(
        recommendations,
        x => dispatch(loadDet(x))
      )
    ).flatMap(identity),
  ],
});
