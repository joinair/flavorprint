
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import itemId from 'reducers/shoppingList/helpers/itemId';

import Item from 'components/pages/OnlineCheckout/Item';

const CategoryHeading = ({ title }) => (
  <div className="OnlineCheckout-category-heading">
    <div className="OnlineCheckout-category-title">
      {title}
    </div>
  </div>
);

const Category = ({ group: { name, items } }) => (
  <div className="OnlineCheckout-category">
    <CategoryHeading title={name} />

    <div className="OnlineCheckout-category-items">
      {map(items, item =>
        <Item item={item} key={itemId(item.key) + item.id} />
      )}
    </div>
  </div>
);

CategoryHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

Category.propTypes = {
  group: PropTypes.shape({
    items: PropTypes.array.isRequired,
    name: PropTypes.string,
  }).isRequired,
};

export default Category;
