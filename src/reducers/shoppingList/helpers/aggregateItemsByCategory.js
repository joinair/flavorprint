
import { createSelector } from 'reselect';

import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';
import map from 'lodash/map';
import partition from 'lodash/partition';
import sortBy from 'lodash/sortBy';
import toLower from 'lodash/toLower';

export default itemsSelector => createSelector(
  itemsSelector,

  items => {
    const [categorised, uncategorised] = partition(
      items,
      item => get(item, 'categoryAnalysisContainer.status') === 'Categorised'
    );

    const sorted = sortBy(
      categorised,
      'categoryAnalysisContainer.categoryAnalysis.product.text'
    );

    const categorisedGroups = groupBy(
      sorted,
      'categoryAnalysisContainer.categoryAnalysis.category.text'
    );

    const categorisedInfos = map(sortBy(keys(categorisedGroups)), category => ({
      name: capitalize(toLower(category)),
      items: categorisedGroups[category],
    }));

    const uncategorisedInfo = {
      name: 'Uncategorised',
      items: uncategorised,
    };

    return uncategorised.length
      ? categorisedInfos.concat(uncategorisedInfo)
      : categorisedInfos;
  }
);
