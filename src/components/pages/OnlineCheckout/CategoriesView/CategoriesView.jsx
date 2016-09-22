
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import Category from './Category';

const CategoriesView = ({ groups, recipes }) => (
  <div className="OnlineCheckout-categories">
    {map(groups, group =>
      <Category
        group={group}
        key={group.name}
        recipes={recipes}
      />
    )}
  </div>
);

CategoriesView.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default CategoriesView;
