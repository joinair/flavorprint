
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';
import size from 'lodash/size';

import { SAVE_COLLECTION_REQUEST } from 'actions/collections';

import { platformPickLazy } from 'helpers/platformPick';

const handler = (state, action) => {
  if (get(action, 'payload.id')) { return; }

  const datetime = new Date().toISOString();
  const { collections } = state;

  mixpanel.register({
    'Date of Last Created Collection': datetime,
    'Number of Created Collections': platformPickLazy({
      mobile: () => undefined,
      default: () =>
        (mixpanel.getProperty('Number of Created Collections') | 0) + 1,
    }),
  });

  mixpanel.track('Create Collection', state, {
    'Created From': get(action, 'meta.context'),
    'Number of Recipes': collections.numRecipes,
    'Serial Number': size(collections.entries),
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Date of Last Created Collection': datetime });
    mixpanel.people.increment('Number of Created Collections');
  }
};

export default ({ state, action }) => {
  if (action.type === SAVE_COLLECTION_REQUEST) {
    handler(state, action);
  }
};
