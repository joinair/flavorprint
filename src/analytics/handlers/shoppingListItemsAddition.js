
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';
import noop from 'lodash/noop';

import Rx from 'rx';

import {
  ADD_SHOPPING_LIST_ITEM,
  ADD_SHOPPING_LIST_RECIPE,
  SEND_SHOPPING_LIST_OPERATIONS_SUCCESS,
} from 'actions/shoppingList';

import loadedFrom from 'analytics/helpers/loadedFrom';

import itemId from 'reducers/shoppingList/helpers/itemId';

const handler = ({ action, state }) => {
  const datetime = new Date().toISOString();
  const isSingle = action.type === ADD_SHOPPING_LIST_ITEM;

  const itemKey = isSingle
    ? action.payload.key
    : undefined;

  const item = isSingle
    ? state.shoppingList.items[itemId(itemKey)]
    : undefined;

  const categorisation = get(item, 'categoryAnalysisContainer.categoryAnalysis');

  const recipeId = isSingle
    ? get(itemKey, 'recipe')
    : get(action, 'payload.recipe.externalUrl') ||
        get(action, 'payload.recipe.id');

  const recipe = state.shoppingList.recipes[recipeId];

  mixpanel.register({
    'Last Item Added': datetime,
  });

  mixpanel.track('Added to Shopping List', state, {
    'Added From': get(action, 'meta.addedFrom'),
    'Category Name': get(categorisation, 'category.text'),
    'Item Text': get(itemKey, 'text'),
    'Item Type': isSingle ? 'Single' : 'Recipe',
    'Loaded From': isSingle ? undefined : loadedFrom(state),
    Product: get(categorisation, 'product.text'),
    'Recipe Url': get(recipe, 'externalUrl'),
    'Recipe Publisher': get(recipe, 'data.publisher.name'),
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Last Item Added': datetime });
    mixpanel.people.increment('Total Items Added');
  }
};

export default actions$ => {
  const waitForApprove = ({ action }) =>
    actions$
      .filter(next =>
        next.action.type === SEND_SHOPPING_LIST_OPERATIONS_SUCCESS)
      .take(1)
      .map(({ state }) => ({ action, state }))
      .timeout(5000, Rx.Observable.empty());

  actions$
    .filter(({ action }) =>
      action.type === ADD_SHOPPING_LIST_ITEM ||
      action.type === ADD_SHOPPING_LIST_RECIPE)
    .flatMap(waitForApprove)
    .subscribe(handler, noop);
};
