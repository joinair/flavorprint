
import map from 'lodash/map';
import filter from 'lodash/filter';

import apiClient from '../../apiClient';

const mergeInteractions = recs => ints =>
  map(recs, rec => ({
    ...rec,
    interactions: filter(ints.content, { sourceId: rec.sourceId }),
  }));

const getRecommendations = (query) =>
  apiClient({
    method: 'get',
    query,
    endpoint: '/v3/recommendations',
  })
  .map(x => x.text)
  .map(JSON.parse);

const getInteractions = userId => recs =>
  apiClient({
    method: 'get',
    query: {
      sourceIds: map(recs, 'sourceId').join(','),
      size: recs.length,
    },
    endpoint: `/v3/users/${userId}/interactions`,
  })
  .map(x => x.text)
  .map(JSON.parse)
  .map(mergeInteractions(recs))
  .map(body => ({ body }));

export default ({ query, session }) =>
  getRecommendations(query)
    .flatMap(getInteractions(session.userId));
