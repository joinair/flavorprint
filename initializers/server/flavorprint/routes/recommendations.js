
import map from 'lodash/map';
import filter from 'lodash/filter';

import apiClient from '../apiClient';
import { toJson, fromJson } from '../helpers';

const mergeInteractions = recs => ints =>
  map(recs, rec => ({
    ...rec,
    interactions: filter(ints.content, { sourceId: rec.sourceId }),
  }));

const getRecommendations = (query, userId) =>
  apiClient({
    method: 'get',
    query,
    endpoint: `/v3/recommendations/${userId}`,
  })
  .map(x => x.text)
  .flatMap(toJson);

const getInteractions = userId => recs =>
  apiClient({
    method: 'get',
    query: {
      sourceIds: map(recs, 'sourceId'),
    },
    endpoint: `/v3/users/${userId}/interactions`,
  })
  .map(x => x.text)
  .flatMap(toJson)
  .map(mergeInteractions(recs))
  .flatMap(fromJson);

export default (req, res) =>
  getRecommendations(req.query, req.params.userId)
    .flatMap(getInteractions(req.params.userId))
    .subscribe(
      text => {
        res.append('Content-Type', 'application/json');
        res.end(text);
      },
      err => res.status(500).end(JSON.stringify(err))
    );
