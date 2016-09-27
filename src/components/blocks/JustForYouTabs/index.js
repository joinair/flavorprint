
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import get from 'lodash/get';

import routerActions from 'actions/router';

import JustForYouTabs from './JustForYouTabs';

const selector = createStructuredSelector({
  activePath: state => get(state, 'router.location.pathname'),
});

const actions = {
  onTabSelect: tab => routerActions.push(tab),
};

export default connect(selector, actions)(JustForYouTabs);
