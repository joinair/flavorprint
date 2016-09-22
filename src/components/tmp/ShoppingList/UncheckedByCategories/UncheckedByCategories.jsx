
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import UncheckedItem from 'components/tmp/ShoppingList/UncheckedItem';

import itemId from 'reducers/shoppingList/helpers/itemId';

const Category = ({ category: { name, items }, recipes }) => {
  const content = map(items, item =>
    <UncheckedItem
      key={itemId(item.key)}
      item={item}
      recipes={recipes}
    />
  );

  return (
    <div>
      <div className="ShoppingList-item-heading">
        <div className="ShoppingList-item-heading-title">
          {name}
        </div>
      </div>

      <div className="ShoppingList-items">
        {content}
      </div>
    </div>
  );
};

const UncheckedByCategories = ({ categories, recipes }) => {
  const content = map(categories, category =>
    <Category
      key={category.name}
      category={category}
      recipes={recipes}
    />
  );

  return <div>{content}</div>;
};

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
  recipes: PropTypes.object.isRequired,
};

UncheckedByCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  })).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default UncheckedByCategories;
