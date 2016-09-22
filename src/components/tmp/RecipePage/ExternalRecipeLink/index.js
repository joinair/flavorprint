
import { connect } from 'react-redux';

import { RECIPE_ORIGIN } from 'constants/AnalyticsEventTypes';

import ExternalRecipeLink from './ExternalRecipeLink';

const actions = {
  notifyAnalytics: () => ({ type: RECIPE_ORIGIN }),
};

export default connect(null, actions)(ExternalRecipeLink);
