
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import Masonry from 'react-masonry-component';

import PrintListExtraLines from
  'components/tmp/PrintShoppingList/PrintListExtraLines';

import PrintListItem from 'components/tmp/PrintShoppingList/PrintListItem';

import itemId from 'reducers/shoppingList/helpers/itemId';

const RecipeGroup = ({ group, recipes }) => {
  const { id, items } = group;

  const content = map(items, item =>
    <PrintListItem key={itemId(item.key)} item={item} />);

  const recipe = id && recipes[id];
  const recipeName = recipe ? recipe.data.name : 'My items';

  return (
    <li className="PrintListGroup">
      <ul className="PrintListGroup-wrap">
        <li>
          <div className="PrintListGroup-heading">
            <h4>{recipeName}</h4>
          </div>
        </li>
        {content}
      </ul>
    </li>
  );
};

const GroupByRecipes = ({ groups, recipes }) => {
  const content = map(groups, group =>
    <RecipeGroup
      key={group.id || 'withoutRecipe'}
      group={group}
      recipes={recipes}
    />);

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

RecipeGroup.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array.isRequired,
  }).isRequired,
  recipes: PropTypes.object.isRequired,
};

GroupByRecipes.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array.isRequired,
  })).isRequired,
  recipes: PropTypes.object.isRequired,
};

export default GroupByRecipes;
