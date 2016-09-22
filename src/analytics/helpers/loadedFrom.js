
import get from 'lodash/get';

import { VIEW_SOURCE } from 'constants/QueryParams';

import { platformPickLazy } from 'helpers/platformPick';

export default state =>
  get(state.router, `location.query.${VIEW_SOURCE}`) ||
  get(state.router, 'previousState.tag') ||
  platformPickLazy({ mobile: () => undefined, default: () => 'App Launch' });
