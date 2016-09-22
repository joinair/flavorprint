
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';
import size from 'lodash/size';

import { SAVE_RECIPE_SUCCESS } from 'actions/recipe';

import loadedFrom from 'analytics/helpers/loadedFrom';

const handler = (state, action) => {
  if (!get(action, 'meta.isNew')) { return; }

  const counter = mixpanel.getProperty('Number of Own Recipes') | 0;
  const datetime = new Date().toISOString();

  mixpanel.register({
    'Date of Last Recipe Created': datetime,
    'Number of Own Recipes': counter + 1,
  });

  mixpanel.track('Create recipe', state, {
    'Loaded From': loadedFrom(state),
    'Image Attached': !!get(action, 'payload.data.image.url'),
    'Number of ingredients': size(get(action, 'payload.data.ingredients')),
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Date of Last Recipe Created': datetime });
    mixpanel.people.increment('Number of Own Recipes');
  }
};

export default ({ state, action }) => {
  if (action.type === SAVE_RECIPE_SUCCESS) {
    handler(state, action);
  }
};
