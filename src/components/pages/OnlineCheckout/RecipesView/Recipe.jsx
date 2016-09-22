
import React, { PropTypes } from 'react';

import get from 'lodash/get';
import find from 'lodash/find';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import formatPrice from 'helpers/formatPrice';

import itemId from 'reducers/shoppingList/helpers/itemId';

import Item from 'components/pages/OnlineCheckout/Item';

const getFormattedPrice = (recipeYield, items) => {
  const recipePrice = recipeYield && reduce(
    items,
    (sum, { siDecision }) =>
      sum + get(siDecision, 'item.price', 0) * get(siDecision, 'qty.value', 1),
    0
  );

  const currencyKey = 'siDecision.item.currency';
  const currency = get(find(items, currencyKey), currencyKey);

  return recipePrice && currency &&
    formatPrice(recipePrice / 1.0 / recipeYield, currency);
};

const RecipeHeading = ({ recipe, items }) => {
  const name = get(recipe, 'data.name', 'My items');
  const recipeYield = get(recipe, 'data.recipeYield', 0);
  const formattedPrice = getFormattedPrice(recipeYield, items);

  return (
    <div className="OnlineCheckout-recipe-heading">
      <div className="OnlineCheckout-recipe-title">
        {name}
      </div>

      {!!formattedPrice &&
        <div className="OnlineCheckout-recipe-servings">
          <div className="OnlineCheckout-recipe-serves">
            Serves <b>{recipeYield}</b>
          </div>

          <div className="OnlineCheckout-recipe-price">
            <b>{formattedPrice.symbol}{formattedPrice.priceString}</b> / serving
          </div>
        </div>
      }
    </div>
  );
};

const Recipe = ({ group: { id, items }, recipes }) => {
  const recipe = get(recipes, id, null);

  return (
    <div className="OnlineCheckout-recipe">
      <RecipeHeading items={items} recipe={recipe} />

      <div className="OnlineCheckout-recipe-items">
        {map(items, item =>
          <Item item={item} key={itemId(item.key) + item.id} />
        )}
      </div>
    </div>
  );
};

RecipeHeading.propTypes = {
  items: PropTypes.array.isRequired,
  recipe: PropTypes.object,
};

Recipe.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array.isRequired,
  }).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default Recipe;
