
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import get from 'lodash/get';
import find from 'lodash/find';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import Item from 'components/tmp/OnlineCheckout/Item';

import formatPrice from 'helpers/formatPrice';

// FIXME: do not use RecipeInfo
import RecipeInfo
  from 'components/tmp/ShoppingList/UncheckedByRecipes/RecipeInfo';

import itemId from 'reducers/shoppingList/helpers/itemId';

const Recipe = ({ group, recipes }) => {
  const { id, items } = group;

  const content = map(items, item =>
    <Item key={itemId(item.key) + item.id} item={item} />);

  const recipe = id && recipes[id];

  const recipeYield = get(recipe, 'data.recipeYield') | 0;
  const recipePrice = recipeYield && reduce(
    items,
    (sum, { siDecision }) =>
      sum + get(siDecision, 'item.price', 0) * get(siDecision, 'qty.value', 1),
    0
  );

  const currencyKey = 'siDecision.item.currency';
  const currency = get(find(items, currencyKey), currencyKey);
  const formatedPrice = recipePrice && currency &&
    formatPrice(recipePrice / 1.0 / recipeYield, currency);

  const servingPrice = !!formatedPrice && (
    <span>
      <i className={classnames(formatedPrice.icon, 'icon')} />
      <b>{formatedPrice.priceString}</b>
    </span>
  );

  const recipeInfo = recipe
    ? (
      <RecipeInfo
        recipe={recipe}
        servingPrice={servingPrice}
      />
    ) : (
      <div className="shopping-list-items-heading">
        <div className="shopping-list-items-heading-container">
          <h4 className="shopping-list-items-heading-title">My items</h4>
        </div>
      </div>
    );

  return (
    <div>
      {recipeInfo}
      <div className="shopping-list-items">
        {content}
      </div>
    </div>
  );
};

const RecipesView = ({ groups, recipes }) => {
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

RecipesView.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array.isRequired,
  })).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default RecipesView;
