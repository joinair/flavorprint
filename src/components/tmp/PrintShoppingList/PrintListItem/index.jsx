
import React, { PropTypes } from 'react';

import findIndex from 'lodash/findIndex';

const PrintListItem = ({ item, recipeIds }) => {
  const matchRecipe = recipeId => recipeId === item.key.recipe;
  const recipeIndex = findIndex(recipeIds, matchRecipe);
  const recipeNumber = recipeIndex !== -1 && recipeIndex + 1;

  return (
    <li className="PrintListGroup-item">
      <label className="PrintListGroup-label">
        <span className="PrintListGroup-label-checkbox">
        </span>
        <span className="item_name item_nonediting">
          {item.key.text}
          <span className="recipe_key">{recipeNumber}</span>
        </span>
      </label>
    </li>
  );
};

PrintListItem.propTypes = {
  item: PropTypes.object.isRequired,
  recipeIds: PropTypes.arrayOf(PropTypes.string),
};

export default PrintListItem;
