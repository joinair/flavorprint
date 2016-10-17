
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OnboardingBubblesStep from './OnboardingBubblesStep';

const selector = (state, props) => ({
  values: props.values ? props.values(state) : [],
});

const actions = (dispatch, props) => bindActionCreators({
  onChange: (...args) => props.onChange(...args),
}, dispatch);

export default connect(selector, actions)(OnboardingBubblesStep);
