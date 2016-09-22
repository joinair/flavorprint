
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import './styles.css';

const PrintRecipeIngredients = ({ recipe }) => {
  const itemList = map(recipe.data.ingredients, (item, index) =>
    <div className="PrintRecipeIngredients-ingredient" key={index}>
      <div className="PrintRecipeIngredients-ingredientSelector" />
      <div className="PrintRecipeIngredients-ingredientText">
        {item.text}
      </div>
    </div>
  );

  const firstColumnItemsCount = Math.ceil(itemList.length / 2);

  return (
    <div className="PrintRecipeIngredients-Ingredients">
      <div className="PrintRecipeIngredients-ingredientLists">
        <div className="PrintRecipeIngredients-ingredientList">
          {itemList.slice(0, firstColumnItemsCount)}
        </div>
        <div className="PrintRecipeIngredients-ingredientList">
          {itemList.slice(firstColumnItemsCount)}
        </div>
      </div>
    </div>
  );
};

PrintRecipeIngredients.propTypes = {
  recipe: PropTypes.shape({
    data: PropTypes.shape({
      ingredients: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PrintRecipeIngredients;
