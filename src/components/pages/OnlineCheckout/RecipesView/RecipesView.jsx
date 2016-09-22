
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import Recipe from './Recipe';

const RecipesView = ({ groups, recipes }) => (
  <div className="OnlineCheckout-recipes">
    {map(groups, group =>
      <Recipe
        group={group}
        key={group.id || 'withoutRecipe'}
        recipes={recipes}
      />
    )}
  </div>
);

RecipesView.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      items: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default RecipesView;
