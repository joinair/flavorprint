
import React, { PropTypes } from 'react';

import get from 'lodash/get';

const formatTime = time => {
  const hours = parseInt(time / 60, 10);
  const minutes = time % 60;

  return (
    (hours ? `${hours} hr` : '') +
    (hours && minutes ? ' ' : '') +
    (minutes ? `${minutes} min` : '')
  );
};

const recipeYieldText = recipeYield =>
  recipeYield === 1
    ? '1 person'
    : `${recipeYield} people`;

const RecipeStats = ({ recipe }) => (
  <div className="RecipePage-stats">
    {Boolean(get(recipe, 'data.durations.prep')) &&
      <div className="RecipePage-stat">
        <div className="RecipePage-stat-type">
          Prep time:
        </div>
        <div className="RecipePage-stat-value">
          {formatTime(recipe.data.durations.prep)}
        </div>
      </div>
    }
    {Boolean(get(recipe, 'data.durations.cook')) &&
      <div className="RecipePage-stat">
        <div className="RecipePage-stat-type">
          Cook time:
        </div>
        <div className="RecipePage-stat-value">
          {formatTime(recipe.data.durations.cook)}
        </div>
      </div>
    }
    {Boolean(recipe.data.recipeYield) &&
      <div className="RecipePage-stat">
        <div className="RecipePage-stat-type">
          Servings:
        </div>
        <div className="RecipePage-stat-value">
          {recipeYieldText(recipe.data.recipeYield)}
        </div>
      </div>
    }
  </div>
);

RecipeStats.propTypes = {
  recipe: PropTypes.shape({
    data: PropTypes.shape({
      durations: PropTypes.shape({
        cook: PropTypes.number,
        prep: PropTypes.number,
      }),

      recipeYield: PropTypes.number,
    }).isRequired,
  }),
};

export default RecipeStats;
