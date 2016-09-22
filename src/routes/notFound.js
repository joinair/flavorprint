
import notFound from 'actions/notFound';

import initialLoad from 'helpers/initialLoad';

export default store => ({
  path: '*',
  component: false,

  onEnter() {
    if (initialLoad()) { return; }
    store.dispatch(notFound.show());
  },
});
