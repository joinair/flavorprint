
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import shoppingList from 'actions/shoppingList';

import OnlineCheckoutViewSelector from './ViewSelector';

const selector = createStructuredSelector({
  view: state => state.shoppingList.sortBy,
});

const actions = {
  onSelect: shoppingList.changeFilter,
};

export default connect(selector, actions)(OnlineCheckoutViewSelector);
