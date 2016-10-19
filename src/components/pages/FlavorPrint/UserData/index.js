
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectors from 'reducers/selectors';

import modal from 'actions/modal';
import { AUTHENTICATION, ONBOARDING } from 'constants/Modals';

import UserData from './UserData';

const selector = createStructuredSelector({
  mark: selectors.userMarkSelector,
  showSave: state => !state.user.isAuthenticated,
  showRefine: state => !selectors.isFinishedOnboardingSelector(state),
});

const actions = {
  onRefine: () => modal.open(ONBOARDING),
  onSave: () => modal.open(AUTHENTICATION, { selectedTab: 'Log in' }),
};

export default connect(selector, actions)(UserData);
