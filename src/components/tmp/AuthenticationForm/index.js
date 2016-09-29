
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AuthenticationForm from './AuthenticationForm';

import {
  facebookLogIn,
  googleLogIn,
} from 'actions/oauth';

const selector = createStructuredSelector({
  user: state => state.user,
});

const actions = {
  onFacebookLogIn: facebookLogIn,
  onGoogleLogIn: googleLogIn,
};

export default connect(selector, actions)(AuthenticationForm);
