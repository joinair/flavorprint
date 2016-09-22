
import mixpanel from 'analytics/mixpanel';

import includes from 'lodash/includes';

import { ONBOARDING } from 'constants/Modals';

import {
  SIGN_UP_SUCCESS,
  LOG_IN_SUCCESS,
} from 'actions/user';

import { OAUTH_LOG_IN_SUCCESS } from 'actions/oauth';

import getOrigin from 'analytics/helpers/getOrigin';

const trackNewUser = (state, context) => {
  const { user } = state;
  const { profile, provider, uid } = user;
  const { firstName, lastName, email, username } = profile;
  const datetime = new Date().toISOString();

  mixpanel.alias(uid);

  mixpanel.register({ Email: email });

  mixpanel.track('Register', state, {
    'Auth provider': provider,
    'Registered From': context,
  });

  mixpanel.people.set({
    'Account Created Date': datetime,
    'Auth provider': provider,
    'User Id': uid,

    $created: datetime,
    $first_name: firstName,
    $last_name: lastName,
    $email: email,
    $username: username,
  });
};

const trackOldUser = (state, context) => {
  const { user } = state;
  const { profile, provider, uid } = user;
  const { firstName, lastName, email } = profile;
  const datetime = new Date().toISOString();

  mixpanel.identify(uid);

  mixpanel.register({ 'Last Login': datetime });

  mixpanel.track('Log In', state, {
    'Auth provider': provider,
    'Logged In From': context,
  });

  mixpanel.people.set({
    'Last Login': datetime,

    $first_name: firstName,
    $last_name: lastName,
    $email: email,
  });

  mixpanel.people.increment('Number of Logins');
};

const handler = state => {
  const { user } = state;
  const { isNew } = user;

  const origin = getOrigin(state);
  const context = state.modal.type === ONBOARDING
    ? 'Onboarding'
    : origin;

  if (isNew) {
    trackNewUser(state, context);
  } else {
    trackOldUser(state, context);
  }
};

export default ({ state, action }) => {
  if (includes([
    SIGN_UP_SUCCESS,
    LOG_IN_SUCCESS,
    OAUTH_LOG_IN_SUCCESS,
  ], action.type)) {
    handler(state);
  }
};
