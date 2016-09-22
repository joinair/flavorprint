
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import pick from 'lodash/pick';
import size from 'lodash/size';

import {
  getGroupId,
  isRecipeStep,
  getCompletedSteps,
  getRemainingSteps,
} from 'helpers/onboarding';

import { ONBOARDING_STEP_ACTION } from 'constants/AnalyticsEventTypes';

import {
  AUTHENTICATION,
  COMBINED_AVOIDANCES,
} from 'constants/Onboarding';

import { UPDATE_USER_SUCCESS } from 'actions/user';

import ensureArray from 'helpers/ensureArray';

const parseRecipe = (step, recipes) =>
  get(recipes, getGroupId(step));

const parseDiet = diet =>
  get(diet, 'canonicalName');

const parseOptions = options =>
  map(options, 'canonicalName');

const parseInventories = inventories =>
  map(inventories, 'name');

const parseCombinedAvoidances = avoidances => {
  let data = [];

  if (avoidances.diet) {
    data.push(parseDiet(avoidances.diet));
  }

  if (!isEmpty(avoidances.allergies)) {
    data = data.concat(parseOptions(avoidances.allergies));
  }

  if (!isEmpty(avoidances.dislikedProducts)) {
    data = data.concat(parseOptions(avoidances.dislikedProducts));
  }

  return data;
};

const handler = (state, action) => {
  const { data, step } = action.payload;

  const completed = getCompletedSteps(state);
  const remaining = getRemainingSteps(state);

  if (!state.user.isAuthenticated) {
    remaining.push(AUTHENTICATION);
  }

  const isContinue = action.payload.action === 'CONTINUE';

  let selected;

  if (isContinue) {
    switch (true) {
      case isRecipeStep(step):
        selected = parseRecipe(step, data.recipes);
        break;

      case step === COMBINED_AVOIDANCES:
        selected = parseCombinedAvoidances(
          pick(data, 'diet', 'allergies', 'dislikedProducts')
        );
        break;

      default:
    }
  }

  mixpanel.register({
    'Number of Onboarding Steps Completed': size(completed),
    'Number of Onboarding Steps Remaining': size(remaining),
    'Onboarding Steps Completed': completed,
    'Onboarding Steps Remaining': remaining,
  });

  mixpanel.track('Onboarding Step Actioned', state, {
    'Selected Items': selected ? ensureArray(selected) : undefined,
    'Step Action': action.payload.action,
    'Step Name': step,
  });
};

const userUpdateHandler = state => {
  const { isAuthenticated, profile } = state.user;
  const completed = getCompletedSteps(state);
  const remaining = getRemainingSteps(state);

  mixpanel.register({
    'Number of Onboarding Steps Completed': size(completed),
    'Number of Onboarding Steps Remaining': size(remaining),
    'Onboarding Steps Completed': completed,
    'Onboarding Steps Remaining': remaining,
  });

  if (isAuthenticated) {
    mixpanel.people.set({
      'Last Onboarding Step Completed':
        get(state, 'router.previousState.location.state.modal.payload.step')
          ? new Date().toISOString()
          : undefined,
      'Number of Onboarding Steps Completed': size(completed),
      'Number of Onboarding Steps Remaining': size(remaining),
      'Onboarding Steps Completed': completed,
      'Onboarding Steps Remaining': remaining,

      Diet: parseDiet(profile.diet) || 'NONE',
      Allergies: parseOptions(profile.allergies),
      'Disliked Products': parseOptions(profile.dislikedProducts),
      Inventories: parseInventories(profile.inventories),
    });
  }
};

export default ({ state, action }) => {
  if (action.type === ONBOARDING_STEP_ACTION) {
    handler(state, action);
  } else if (action.type === UPDATE_USER_SUCCESS) {
    userUpdateHandler(state);
  }
};
