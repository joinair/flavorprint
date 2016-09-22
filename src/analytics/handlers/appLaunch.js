
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';

import cookies from 'helpers/cookies';

import {
  APP_LAUNCHED,
  COOKBOOK_VIEW,
  HOME_VIEW,
  RECIPE_VIEW,
 } from 'constants/AnalyticsEventTypes';

import { MIXPANEL_FIRST_VISIT_DATE } from 'constants/CookiesKeys';
import { UTM_MEDIUM, UTM_SOURCE } from 'constants/QueryParams';

import analytics from 'analytics';
import getOrigin from 'analytics/helpers/getOrigin';

const handler = (state, previousState) => {
  const origin = getOrigin(state);

  if (!origin) { return; }

  const counter = mixpanel.getProperty('App Launch Count') | 0;
  const datetime = new Date().toISOString();
  const visitDate = cookies.get(MIXPANEL_FIRST_VISIT_DATE);
  const query = get(state.router, 'location.query') || {};

  if (!visitDate) {
    cookies.set(MIXPANEL_FIRST_VISIT_DATE, Date.now());
  }

  const firstVisit = !visitDate ||
    (Date.now() - (24 * 60 * 60 * 1000) <= parseInt(visitDate, 10));

  mixpanel.register({
    'App Launch Count': counter + 1,
    'Last Launch Date': datetime,
    'First Time': firstVisit,
  });

  mixpanel.track('App Launched', state, {
    'Start Page': origin,
    'Whisk Medium': query[UTM_MEDIUM],
    'Whisk Source': query[UTM_SOURCE],
  });

  if (state.user.isAuthenticated) {
    mixpanel.people.set({ 'Last Launch Date': datetime });
    mixpanel.people.increment('App Launch Count');
  }

  if (origin === 'Cookbook' || origin === 'Other user cookbook') {
    analytics(state, { type: COOKBOOK_VIEW }, previousState);
  }

  if (origin === 'Recipe feed') {
    analytics(state, { type: HOME_VIEW }, previousState);
  }

  if (origin === 'Recipe view') {
    analytics(state, { type: RECIPE_VIEW }, previousState);
  }
};

export default ({ state, action, previousState }) => {
  if (action.type === APP_LAUNCHED) {
    handler(state, previousState);
  }
};

// FIXME: ONLINE-CHECKOUT
// import {
//   LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS,
// } from 'actions/onlineCheckout';

// if (origin === 'Online Checkout') {
//   analytics(state, { type: LOAD_ONLINE_CHECKOUT_ITEMS_SUCCESS }, previousState);
// }
