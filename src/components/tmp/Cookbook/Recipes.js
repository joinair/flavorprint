
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import get from 'lodash/get';
import includes from 'lodash/includes';
import map from 'lodash/map';

import { CONTEXT } from 'actions/feed';
import { ALL_RECIPES_COLLECTION } from 'constants/QueryParams';

import cookbook from 'actions/cookbook';
import fetching from 'actions/fetching';

import Feed from 'components/tmp/Feed';

const isFetchingSelector = state => state.fetching[fetching.GROUP_IDS.FEED];

export const recipesSelector = (state, props) =>
  state.feed.context !== CONTEXT.COOKBOOK
    ? state.feed.recipes
    : map(state.feed.recipes, recipe => {
      if (props.activeCollectionId === ALL_RECIPES_COLLECTION) {
        return get(recipe, 'cookbook.saved')
          ? recipe
          : assign({}, recipe, { isRemoved: true });
      }

      return includes(
        get(recipe, 'cookbook.collectionIds') || [],
        props.activeCollectionId
      ) ? recipe
        : assign({}, recipe, { isRemoved: true });
    });

const showMoreSelector = state =>
  state.feed.recipes.length < state.feed.paging.total;

const feedSelector = createStructuredSelector({
  isFetching: isFetchingSelector,
  recipes: recipesSelector,
  showMore: showMoreSelector,
});

const actions = (dispatch, props) => bindActionCreators({
  onShowMore: () => cookbook.loadRecipes(true, props.route),
}, dispatch);

export default connect(feedSelector, actions)(Feed);
