
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import feed from 'actions/feed';
import fetching from 'actions/fetching';

import Feed from 'components/tmp/Feed';

const isFetchingSelector = state => state.fetching[fetching.GROUP_IDS.FEED];
const recipesSelector = state => state.feed.recipes;
const showMoreSelector = state =>
  state.feed.recipes.length < state.feed.paging.total;

const selector = createStructuredSelector({
  isFetching: isFetchingSelector,
  recipes: recipesSelector,
  showMore: showMoreSelector,
});

const actions = {
  onShowMore: () => feed.load(true),
};

export default connect(selector, actions)(Feed);
