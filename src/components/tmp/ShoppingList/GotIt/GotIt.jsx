
import React, { PropTypes } from 'react';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import partial from 'lodash/partial';

import iconCheckGotIt from 'assets/images/icons/icon-check-got-it.svg';

import Checkbox from 'components/ui-elements/Checkbox';
import iconRemove from 'assets/images/icons/icon-close.svg';
import Icon from 'components/ui-elements/Icon';

const Item = ({ item: { key }, recipes, onRemove, onUncheck }) => {
  const { text, recipe } = key;

  const recipeName = recipe && get(recipes[recipe], 'data.name');
  const recipeInfo = recipeName && (
    <div className="ShoppingList-item-subName">{recipeName}</div>
  );

  return (
    <div className="ShoppingList-item">
      <div className="ShoppingList-item-content ShoppingList-item-content--listItem">
        <Checkbox
          checked
          onChange={partial(onUncheck, key)}
        />

        <div className="ShoppingList-item-text">
          <div className="ShoppingList-item-name">{text}</div>
          {recipeInfo}
        </div>

        <div className="ShoppingList-item-remove" onClick={partial(onRemove, key)}>
          <Icon
            className="ShoppingList-item-remove-icon"
            glyph={iconRemove}
          />
        </div>
      </div>
   </div>
  );
};

const GotIt = props => {
  const {
    items, recipes,
    onCheckedClear, onItemRemove, onItemUncheck,
  } = props;

  if (isEmpty(items)) { return null; }

  const itemElements = map(items, item =>
    <Item
      key={item.key.text}
      item={item}
      recipes={recipes}
      onRemove={onItemRemove}
      onUncheck={onItemUncheck}
    />
  );

  const itemsCountText = (items.length > 1) ? 'items' : 'item';
  const itemsCount = (
    <span className="ShoppingList-item-heading-count">
      {items.length} {itemsCountText}
    </span>
  );

  return (
    <div>
      <div className="ShoppingList-item-heading ShoppingList-item-heading--gotIt">
        <Icon className="ShoppingList-item-heading-icon" glyph={iconCheckGotIt} />
        <div className="ShoppingList-item-heading-title">
          Got it {itemsCount}
        </div>

        <a className="ShoppingList-item-heading-linkClear" onClick={onCheckedClear}>
          Clear
        </a>
      </div>

      <div className="ShoppingList-items">
        {itemElements}
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.object.isRequired,
  }).isRequired,
  recipes: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
};

GotIt.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.shape({
      text: PropTypes.string.isRequired,
      recipe: PropTypes.string,
    }).isRequired,
  })).isRequired,

  recipes: PropTypes.object.isRequired,

  onCheckedClear: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onItemUncheck: PropTypes.func.isRequired,
};

export default GotIt;
