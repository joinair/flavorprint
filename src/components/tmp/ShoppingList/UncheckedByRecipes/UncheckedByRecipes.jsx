
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import RecipeInfo from './RecipeInfo';
import UncheckedItem from 'components/tmp/ShoppingList/UncheckedItem';

import itemId from 'reducers/shoppingList/helpers/itemId';

const Recipe = ({ group, recipes }) => {
  const { id, items } = group;

  const content = map(items, item =>
    <UncheckedItem key={itemId(item.key)} item={item} />);

  const recipe = id && recipes[id];
  const recipeInfo = recipe
    ? (
      <RecipeInfo recipe={recipe} />
    ) : (
      <div className="ShoppingList-item-heading">
        <div className="ShoppingList-item-heading-title">My items</div>
      </div>
    );

  return (
    <div>
      {recipeInfo}
      <div className="ShoppingList-items">
        {content}
      </div>
    </div>
  );
};

const UncheckedByRecipes = ({ groups, recipes }) => {
  const content = map(groups, group =>
    <Recipe
      key={group.id || 'withoutRecipe'}
      group={group}
      recipes={recipes}
    />);

  return <div>{content}</div>;
};

Recipe.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array.isRequired,
  }).isRequired,
  recipes: PropTypes.object.isRequired,
};

UncheckedByRecipes.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array.isRequired,
  })).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default UncheckedByRecipes;
