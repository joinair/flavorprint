
import { FLAVORPRINT } from 'constants/Routes';

import FlavorPrint from 'components/pages/FlavorPrint';

import { loadMark } from 'actions/user';

export default store => ({
  path: FLAVORPRINT,
  component: FlavorPrint,

  prepareData() {
    return store.dispatch(loadMark());
  },
});
