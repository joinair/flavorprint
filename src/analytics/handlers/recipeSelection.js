
import mixpanel from 'analytics/mixpanel';

import difference from 'lodash/difference';
import get from 'lodash/get';
import head from 'lodash/head';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import size from 'lodash/size';

import {
  SELECT_RECIPE_SUCCESS,
  UPDATE_RECIPE_COLLECTIONS_SUCCESS,
} from 'actions/recipes';

import { SAVE_RECIPE_SUCCESS } from 'actions/recipe';

import { platformPickLazy } from 'helpers/platformPick';

import getOrigin from 'analytics/helpers/getOrigin';
import loadedFrom from 'analytics/helpers/loadedFrom';

const handler = (state, action) => {
  const { meta, payload } = action;
  const { id, externalUrl, data, tile } = payload;
  const { pendingExternal, publisher, sourceUrl } = data;

  let collectionId;
  let cookbookUser;

  if (get(meta, 'previous.cookbook')) {
    const nextIds = get(action, 'payload.cookbook.collectionIds');
    const prevIds = get(action, 'meta.previous.cookbook.collectionIds');

    if (size(nextIds) <= size(prevIds)) { return; }

    collectionId = head(difference(nextIds, prevIds));
  }

  const datetime = new Date().toISOString();
  const origin = getOrigin(state);

  if (origin === 'Other user cookbook') {
    cookbookUser = state.cookbook.user.profile.username;
  }

  const recommendation = origin === 'Recipe view'
    ? get(state.router, 'location.query.recommendation')
    : get(tile, 'type');

  const { recipes } = state.feed;

  const score = origin === 'Recipe feed'
    ? size(recipes) / size(filter(recipes, 'tile.type', recommendation))
    : undefined;

  mixpanel.register({ 'Date of Last Recipe Added': datetime });

  if (!collectionId) {
    platformPickLazy({
      mobile: () => undefined,
      default: () => mixpanel.register({
        'Total Recipes Added':
          (mixpanel.getProperty('Total Recipes Added') | 0) + 1,
      }),
    });
  }

  mixpanel.track('Added to collection', state, {
    'Action Score': score,
    'Added From': origin,
    Collection: collectionId,
    'Cookbook User': cookbookUser,
    'Loaded From': loadedFrom(state),
    'Pending External': pendingExternal,
    'Recipe Id': id,
    'Recipe Source': sourceUrl,
    'Recipe Url': externalUrl,
    'Recipe Publisher': get(publisher, 'name', 'whisk.com'),
    'Recommendation Type': recommendation,
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Date of Last Recipe Added': datetime });

    if (!collectionId) {
      mixpanel.people.increment('Total Recipes Added');
    }

    mixpanel.people.union('Recipes Added', id);
  }
};

export default ({ state, action }) => {
  if (includes([
    SELECT_RECIPE_SUCCESS,
    UPDATE_RECIPE_COLLECTIONS_SUCCESS,
    SAVE_RECIPE_SUCCESS,
  ], action.type)) {
    handler(state, action);
  }
};
