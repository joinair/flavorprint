
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import recipes from 'actions/recipes';
import fetching from 'actions/fetching';

import Feed from 'components/tmp/Feed';

const isFetchingSelector = state => state.fetching[fetching.GROUP_IDS.FEED];
const recipesSelector = state => state.feed.recipes;
const showMoreSelector = state =>
  state.feed.recipes.length < state.feed.paging.total;

const feedSelector = createStructuredSelector({
  isFetching: isFetchingSelector,
  recipes: recipesSelector,
  showMore: showMoreSelector,
});

const actions = {
  onShowMore: () => recipes.search(true),
};

export default connect(feedSelector, actions)(Feed);
