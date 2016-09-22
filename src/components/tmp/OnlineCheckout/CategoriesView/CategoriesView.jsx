
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import Item from 'components/tmp/OnlineCheckout/Item';

import itemId from 'reducers/shoppingList/helpers/itemId';

const Category = ({ category: { name, items }, recipes }) => {
  const content = map(items, item =>
    <Item
      key={itemId(item.key) + item.id}
      item={item}
      recipes={recipes}
    />
  );

  return (
    <div>
      <div className="OnlineCheckoutCategory">
        {name}
      </div>

      {content}
    </div>
  );
};

const CategoriesView = ({ categories, recipes }) => {
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

CategoriesView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  })).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default CategoriesView;
