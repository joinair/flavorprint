
import head from 'lodash/head';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

export const splitByColumns = columns => rows => map(
  groupBy(
    map(rows, (x, i) => [x, i]),
    ([, i]) => Math.floor(i / columns)
  ),
  x => map(x, head)
);
