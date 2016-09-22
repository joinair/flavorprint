
import assign from 'lodash/assign';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import omitBy from 'lodash/omitBy';

import { SEARCH_RESULTS } from 'constants/Routes';
import { APPLY_FILTERS, RECIPES_FILTER } from 'constants/QueryParams';

import router from '../router';

import { convertFiltersToQuery } from 'helpers/search';

const search = (params, method = 'push') => (dispatch, getState) => {
  const { pathname, query } = getState().router.location;
  const cleanQuery = pathname === SEARCH_RESULTS ? query : {};

  const omitFunc = v => isString(v) ? isEmpty(v) : !v;
  const newQuery = assign({}, cleanQuery, params);

  return dispatch(
    router[method](
      SEARCH_RESULTS,
      omitBy(newQuery, omitFunc)
    )
  );
};

const searchTerm = (term, method) =>
  search({
    [RECIPES_FILTER]: term,
    [APPLY_FILTERS]: true,
  }, method);

const applyFilters = (filters, method) => search(convertFiltersToQuery(filters), method);

const resetFilters = (method) => search({ [APPLY_FILTERS]: true }, method);

export default { searchTerm, applyFilters, resetFilters };
