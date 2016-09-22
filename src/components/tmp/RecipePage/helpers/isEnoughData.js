
import get from 'lodash/get';

export default ({ data }) =>
  Boolean(data.description) ||
  Boolean(
    get(data, 'durations.cook') ||
    get(data, 'durations.prep') ||
    data.recipeYield
  );
