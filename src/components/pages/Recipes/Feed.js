
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import feed from 'actions/recipes';
import fetching from 'actions/fetching';
import selectors from 'reducers/selectors';

import Feed from 'components/blocks/Feed';

const isFetchingSelector = state => state.fetching[fetching.GROUP_IDS.RECIPES];

const selector = createStructuredSelector({
  isFetching: isFetchingSelector,
  recommendationName: () => 'recipes',
  recommendations: selectors.getSortedRecipes,
  showMore: () => true,
});

const actions = {
  onShowMore: () => feed.loadDetailedRecipes(),
};

export default connect(selector, actions)(Feed);
