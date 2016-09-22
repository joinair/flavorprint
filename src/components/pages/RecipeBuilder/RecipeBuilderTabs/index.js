
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import RecipeBuilderTabs from './RecipeBuilderTabs';

import router from 'actions/router';

const tabInfoSelector = state => ({
  page: state.router.location.pathname,
});

const selector = createStructuredSelector({
  tabInfo: tabInfoSelector,
});

const actions = {
  navigateToTab: path => router.push(path),
};

export default connect(selector, actions)(RecipeBuilderTabs);
