
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import values from 'lodash/values';

import AvoidancesAutocomplete from './AvoidancesAutocomplete';

const productsSelector = createSelector(
  state => state.popularProducts.entries,
  products => values(products)
);

const selector = createStructuredSelector({
  products: productsSelector,
});

export default connect(selector)(AvoidancesAutocomplete);
