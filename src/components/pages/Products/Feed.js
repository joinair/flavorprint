
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import feed from 'actions/products';
import fetching from 'actions/fetching';
import selectors from 'reducers/selectors';

import Feed from 'components/blocks/Feed';
import ProductCard from 'components/blocks/ProductCard';

const isFetchingSelector = state => state.fetching[fetching.GROUP_IDS.PRODUCTS];

const selector = createStructuredSelector({
  isFetching: isFetchingSelector,
  component: () => ProductCard,
  recommendationName: () => 'products',
  recommendations: selectors.getSortedProducts,
  showMore: selectors.canLoadMoreProducts,
});

const actions = {
  onShowMore: () => feed.load(true),
};

export default connect(selector, actions)(Feed);
