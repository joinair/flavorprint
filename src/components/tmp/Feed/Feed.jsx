
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import './styles.css';

import Button from 'components/ui-elements/Button';
import Preloader from 'components/ui-elements/Preloader';
import RecipeCard from 'components/tmp/RecipeCard';

const Feed = ({
  component,
  isFetching,
  onShowMore,
  placeholder,
  recipes,
  showMore,
}) => {
  if (isFetching && !recipes.length) {
    return <Preloader />;
  }

  const preloader = showMore && isFetching && <Preloader />;
  const CardComponent = component;

  const showMoreButton = preloader || showMore && (
    <Button
      className="Feed-showMoreButton"
      outline
      size="xLarge"
      onClick={onShowMore}
    >
      Show more recipes
    </Button>
  );

  const renderRecipe = (recipe, index) =>
    <CardComponent
      key={recipe.externalUrl || recipe.id || index}
      recipe={recipe}
    />;

  const content = recipes.length
    ? <div className="Feed-list">
        {map(recipes, renderRecipe)}
      </div>
    : placeholder;

  return (
    <div>
      <div className="Feed">{content}</div>
      {showMoreButton}
    </div>
  );
};

Feed.propTypes = {
  isFetching: PropTypes.any,
  placeholder: PropTypes.node,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    externalUrl: PropTypes.string,
  })).isRequired,
  showMore: PropTypes.bool,
  component: PropTypes.func,

  onShowMore: PropTypes.func,
};

Feed.defaultProps = {
  component: RecipeCard,
};

export default Feed;
