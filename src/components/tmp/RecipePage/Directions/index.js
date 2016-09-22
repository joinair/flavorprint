
import React, { PropTypes } from 'react';

import './styles.css';

import Button from 'components/ui-elements/Button';
import ExternalRecipeLink from 'components/tmp/RecipePage/ExternalRecipeLink';

const RecipePageDirections = ({ recipe }) => {
  const { externalUrl, data } = recipe;

  return (
    <div className="RecipePageDirections">
      <h2 className="RecipePageDirections-title">
        Directions
      </h2>

      <div className="RecipePageDirections-content">
        <div className="RecipePageDirections-link">
          Read the directions for this recipe at{' '}
          <ExternalRecipeLink href={externalUrl}>
            {data.publisher.displayName}
          </ExternalRecipeLink>
        </div>

        <div className="RecipePageDirections-button">
          <ExternalRecipeLink href={externalUrl}>
            <Button color="primary">
              Read directions on {data.publisher.displayName}
            </Button>
          </ExternalRecipeLink>
        </div>
      </div>
    </div>
  );
};

RecipePageDirections.propTypes = {
  recipe: PropTypes.shape({
    externalUrl: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }),
};

export default RecipePageDirections;
