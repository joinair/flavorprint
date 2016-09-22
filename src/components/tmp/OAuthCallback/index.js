
import { connect } from 'react-redux';

import get from 'lodash/get';

import { sendOAuth } from 'actions/oauth';

import OAuthCallback from './OAuthCallback';

const selector = state => ({ service: get(state, 'router.params.service') });

const actions = {
  onSuccess: sendOAuth,
};

export default connect(selector, actions)(OAuthCallback);
