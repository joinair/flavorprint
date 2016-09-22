
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import assign from 'lodash/assign';
import union from 'lodash/union';
import values from 'lodash/values';
import filter from 'lodash/filter';

import { update } from 'actions/user';

import { AVOIDANCES } from 'constants/Onboarding';

import AvoidancesModal from './AvoidancesModal';

const avoidancesSelector = state => state.user.profile.dislikedProducts;

const productsSelector = state => values(state.popularProducts.entries);

const selector = createStructuredSelector({
  avoidances: avoidancesSelector,
  products: productsSelector,
});

const changeDislikedProducts = toSelect => product => (dispatch, getState) => {
  const state = getState();
  const { profile } = state.user;
  const { dislikedProducts } = profile;

  const withoutProduct = filter(dislikedProducts, x => x.canonicalName !== product.canonicalName);

  const newProducts = toSelect
    ? [...withoutProduct, product]
    : withoutProduct;

  return dispatch(update(assign({}, profile, {
    dislikedProducts: newProducts,
    onboarding: union(profile.onboarding, [AVOIDANCES]),
  })));
};

const actions = {
  onSelect: changeDislikedProducts(true),
  onDeselect: changeDislikedProducts(false),
};

export default connect(selector, actions)(AvoidancesModal);
