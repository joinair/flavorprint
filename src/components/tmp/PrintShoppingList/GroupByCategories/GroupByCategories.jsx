
import React, { PropTypes } from 'react';

import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import Masonry from 'react-masonry-component';

import PrintListItem from 'components/tmp/PrintShoppingList/PrintListItem';
import PrintListExtraLines from 'components/tmp/PrintShoppingList/PrintListExtraLines';

import itemId from 'reducers/shoppingList/helpers/itemId';

const CategoryGroup = ({ name, items, recipeIds }) => {
  const content = map(items, item =>
    <PrintListItem key={itemId(item.key)} recipeIds={recipeIds} item={item} />);

  return (
    <li className="PrintListGroup">
      <ul className="PrintListGroup-wrap">
        <li>
          <div className="PrintListGroup-heading">
            <h4>{name}</h4>
          </div>
        </li>
        {content}
      </ul>
    </li>
  );
};

const GroupByCategories = ({ categories, recipes, showRecipeKey }) => {
  const recipeIds = showRecipeKey
    ? map(sortBy(recipes, 'data.name'), recipe =>
        recipe.externalUrl || recipe.id)
    : [];

  const content = map(categories, category =>
    <CategoryGroup key={category.name} recipeIds={recipeIds} {...category} />);

  return (
    <Masonry
      className={'PrintList'}
      elementType={'ul'}
      disableImagesLoaded={false}
    >
      {content}
      <PrintListExtraLines />
    </Masonry>
  );
};

CategoryGroup.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  recipeIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

GroupByCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  })).isRequired,
  recipes: PropTypes.object.isRequired,
  showRecipeKey: PropTypes.bool.isRequired,
};

export default GroupByCategories;
