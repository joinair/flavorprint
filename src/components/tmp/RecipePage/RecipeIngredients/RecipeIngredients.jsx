
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import itemId from 'reducers/shoppingList/helpers/itemId';

import iconAdd from 'assets/images/icons/icon-add.svg';
import iconCheck from 'assets/images/icons/icon-check.svg';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

const Ingredient = ({ ingredient, isAdded, onClick }) => {
  const selectorClasses = classnames(
    'RecipePage-ingredient-selector',
    { 'is-added': isAdded }
  );

  return (
    <div className="RecipePage-ingredient">
      <div
        className={selectorClasses}
        onClick={onClick}
      >
        <Icon
          className="RecipePage-ingredient-selector-icon"
          glyph={isAdded ? iconCheck : iconAdd}
        />
      </div>
      <div className="RecipePage-ingredient-text">
        {ingredient.text}
      </div>
    </div>
  );
};

const RecipeIngredients = ({
  recipe,
  shoppingListItems,
  onIngredientAddToShoppingList,
  onIngredientRemoveFromShoppingList,
  onRecipeAddToShoppingList,
  onRecipeRemoveFromShoppingList,
}) => {
  let allAdded = true;

  const items = map(recipe.data.ingredients, (ingredient, index) => {
    const key = {
      recipe: recipe.externalUrl || recipe.id,
      text: ingredient.text,
    };
    const id = itemId(key);
    const { checked, unchecked } = shoppingListItems[id] || {};
    const isAdded = !(isEmpty(checked) && isEmpty(unchecked));
    allAdded = allAdded && isAdded;

    const onClick = () => {
      if (isAdded) {
        onIngredientRemoveFromShoppingList(key);
      } else {
        onIngredientAddToShoppingList(key, 'Recipe View', {}, recipe);
      }
    };

    return (
      <Ingredient
        ingredient={ingredient}
        isAdded={isAdded}
        key={index}
        onClick={onClick}
      />
    );
  });

  const shoppingListRecipeButton = (
    <Button
      icon={allAdded ? iconCheck : iconAdd}
      iconStyle={{ height: 11, width: 11 }}
      onClick={
        allAdded
          ? onRecipeRemoveFromShoppingList
          : onRecipeAddToShoppingList
      }
      outline={!allAdded}
    >
      {
        allAdded
          ? 'Recipe on shopping list'
          : 'Add all ingredients to list'
      }
    </Button>
  );

  const displayInTwoColumns =
    (!recipe.externalUrl && !recipe.data.instructions.length) ||
    (!!recipe.externalUrl && items.length > 1);
  let columns;

  if (displayInTwoColumns) {
    const firstColumnItemsCount = Math.ceil(items.length / 2);

    columns = (
      <div className="RecipePage-ingredientLists">
        <div className="RecipePage-ingredientList">
          {items.slice(0, firstColumnItemsCount)}
        </div>
        <div className="RecipePage-ingredientList">
          {items.slice(firstColumnItemsCount)}
        </div>
      </div>
    );
  } else {
    columns = (
      <div className="RecipePage-ingredientList">
        {items}
      </div>
    );
  }

  return (
    <div className="RecipePage-ingredients">
      {columns}

      <div className="RecipePage-buttonsList">
        <div className="RecipePage-buttonItem">
          {shoppingListRecipeButton}
        </div>
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  isAdded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    externalUrl: PropTypes.string,
    ingredients: PropTypes.array,
  }),

  shoppingListItems: PropTypes.object.isRequired,

  onIngredientAddToShoppingList: PropTypes.func.isRequired,
  onIngredientRemoveFromShoppingList: PropTypes.func.isRequired,
  onRecipeAddToShoppingList: PropTypes.func.isRequired,
  onRecipeRemoveFromShoppingList: PropTypes.func.isRequired,
};

export default RecipeIngredients;
