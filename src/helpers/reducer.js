
import get from 'lodash/get';
import reduce from 'lodash/reduce';
import set from 'lodash/set';

export const normalizeEntities =
  (entities, key = 'itemId', value = '') =>
    reduce(
      entities,
      (normalized, entity) =>
        set(
          normalized,
          get(entity, key),
          get(entity, value, entity)
        ),
      {}
    );

export default {
  normalizeEntities,
};
