
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import itemId from 'reducers/shoppingList/helpers/itemId';

import FrequentlyUsed from './FrequentlyUsed';

import shoppingList from 'actions/shoppingList';

const OPTIONS = [
  'milk', 'eggs', 'bread', 'butter', 'cheese',
  'chicken', 'bananas', 'onions', 'potatoes',
  'garlic', 'apples', 'bacon',
  'chicken breast', 'broccoli', 'mushrooms',
  'carrots', 'tomatoes', 'pasta', 'lettuce',
];

const itemsSelector = state => state.shoppingList.items;

const optionsSelector = createSelector(
  itemsSelector,

  items => map(OPTIONS, option => {
    const item = items[itemId({ text: option })];
    const { checked, unchecked } = (item || {});

    return {
      selected: !isEmpty(checked) || !isEmpty(unchecked),
      text: option,
    };
  })
);

const frequentUsedSelector = createStructuredSelector({
  options: optionsSelector,
});

const actions = dispatch => ({
  onClick: ({ selected, text }) => {
    if (selected) {
      dispatch(shoppingList.removeItem({ text }));
    } else {
      dispatch(shoppingList.addItem({ text }, 'Frequently Used'));
    }
  },
});

export default connect(frequentUsedSelector, actions)(FrequentlyUsed);
