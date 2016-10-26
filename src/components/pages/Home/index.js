
import { connect } from 'react-redux';

import selectors from 'reducers/selectors';
import { ONBOARDING } from 'constants/Modals';
import { FLAVORPRINT } from 'constants/Routes';

import modal from 'actions/modal';
import router from 'actions/router';

import Home from './Home';

const actions = {
  onStartOnboarding: () => (dispatch, getState) => {
    const state = getState();
    const isFinished = selectors.isFinishedOnboardingSelector(state);

    if (isFinished) {
      dispatch(router.push(FLAVORPRINT));
    } else {
      dispatch(modal.open(ONBOARDING));
    }
  },
};

export default connect(null, actions)(Home);
