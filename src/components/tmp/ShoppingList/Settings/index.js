
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  changeFilter,
  clearItems,
} from 'actions/shoppingList';

import Settings from './Settings';

const sortBySelector = state => state.shoppingList.sortBy;

const settingsSelector = createStructuredSelector({
  sortBy: sortBySelector,
});

const actions = {
  onFilterChange: changeFilter,
  onItemsClear: clearItems,
};

export default connect(settingsSelector, actions)(Settings);
