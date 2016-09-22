
import { Navigator } from 'react-native';

import assign from 'lodash/assign';

import { MOBILE_FILTERS } from 'constants/Routes';

import feed from 'actions/feed';

import SearchFilters from 'components/modals/SearchFilters';

export default store => ({
  path: MOBILE_FILTERS,
  component: SearchFilters,
  configureScene: () => assign({}, Navigator.SceneConfigs.FloatFromRight, {
    gestures: null,
  }),


  prepareData() {
    setTimeout(() => {
      store.dispatch(feed.clean());
    }, 0);
  },
});
