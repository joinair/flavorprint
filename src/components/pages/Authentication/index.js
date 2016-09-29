
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import { COOKBOOK } from 'constants/Routes';
import { REDIRECT_PATH } from 'constants/QueryParams';

import { replace, push } from 'actions/router';

import Authentication from './Authentication';

const isAuthenticatedSelector = state => state.user.isAuthenticated;

const isPublishersLandingSelector = state =>
  !get(state.router, 'previousState.location') &&
  get(state.router, `location.query.${REDIRECT_PATH}`) === COOKBOOK;

const routerPathSelector = state => get(state.router, 'location.pathname');

const authenticationSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  isPublishersLanding: isPublishersLandingSelector,
  routerPath: routerPathSelector,
});

const actions = {
  onAuth: replace,
  onTabSelect: push,
};

export default connect(authenticationSelector, actions)(Authentication);
