
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { completePercentage } from 'helpers/onboarding';

import { ONBOARDING_VISIBLE } from 'constants/AnalyticsEventTypes';

import onboarding from 'actions/onboarding';

import CompleteProfile from './CompleteProfile';

const selector = createStructuredSelector({
  isAuthenticated: state => state.user.isAuthenticated,
  profile: state => state.user.profile,
  uid: state => state.user.uid,
  completePercentage,
});

const onVisible = () => ({
  type: ONBOARDING_VISIBLE,
  payload: { type: 'Complete Profile Banner' },
});

const actions = {
  onComplete: () => onboarding.open('Complete Profile Banner'),
  onVisible,
};

export default connect(selector, actions)(CompleteProfile);
