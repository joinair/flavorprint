
import find from 'lodash/find';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import reject from 'lodash/reject';

import {
  FILTERS_WITH_INGRIDIENTS,
  FILTERS_WITHOUT_INGRIDIENTS,
  FILTERS_DIETS,
  FILTERS_ALLERGIES,
  FILTERS_TIME,
  FILTERS_MEAL_TYPES,
} from 'constants/QueryParams';

const arrayFormat = arr => map(arr, 'text').join(',');

export const parseFiltersFromQuery = (searchPreferences, products, query) => {
  const extractProperty = (param, sourceGetter) => {
    const input = get(query, param, '').split(',');
    const source = get(searchPreferences, sourceGetter, []);
    const mapped = map(input, text => find(source, { text }));
    return reject(mapped, isNil);
  };

  const extractProducts = (param) => {
    const input = get(query, param, '').split(',');
    const mapped = map(input, x => products[x.toLowerCase()]);
    return reject(mapped, isNil);
  };

  const withIngredients = extractProducts(FILTERS_WITH_INGRIDIENTS);
  const withoutIngredients = extractProducts(FILTERS_WITHOUT_INGRIDIENTS);
  const diets = extractProperty(FILTERS_DIETS, 'diets');
  const allergies = extractProperty(FILTERS_ALLERGIES, 'allergies');
  const mealTypes = extractProperty(FILTERS_MEAL_TYPES, 'mealTypes');

  return {
    withIngredients,
    withoutIngredients,
    diets,
    allergies,
    mealTypes,
    time: Number(get(query, FILTERS_TIME, 0)),
  };
};

export const convertFiltersToQuery = filters => ({
  [FILTERS_WITH_INGRIDIENTS]: arrayFormat(filters.withIngredients),
  [FILTERS_WITHOUT_INGRIDIENTS]: arrayFormat(filters.withoutIngredients),
  [FILTERS_DIETS]: arrayFormat(filters.diets),
  [FILTERS_ALLERGIES]: arrayFormat(filters.allergies),
  [FILTERS_MEAL_TYPES]: arrayFormat(filters.mealTypes),
  [FILTERS_TIME]: filters.time,
});

export default { parseFiltersFromQuery, convertFiltersToQuery };
