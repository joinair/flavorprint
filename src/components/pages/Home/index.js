
import { connect } from 'react-redux';

import modal from 'actions/modal';
import { ONBOARDING } from 'constants/Modals';

import Home from './Home';

const actions = {
  onStartOnboarding: () => modal.open(ONBOARDING),
};

export default connect(null, actions)(Home);
