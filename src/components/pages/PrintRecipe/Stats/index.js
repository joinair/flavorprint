
import React, { PropTypes } from 'react';

import get from 'lodash/get';

import './styles.css';

const recipeYieldText = recipeYield =>
  recipeYield === 1
    ? '1 person'
    : `${recipeYield} people`;

const formatTime = time => {
  const hours = parseInt(time / 60, 10);
  const minutes = time % 60;

  return (
    (hours ? `${hours} hr` : '') +
    (hours && minutes ? ' ' : '') +
    (minutes ? `${minutes} min` : '')
  );
};

const PrintRecipeStats = ({ recipe }) => (
  <div className="PrintRecipeStats">
    {!!get(recipe, 'data.durations.prep') &&
      <div className="PrintRecipeStats-stat">
        <div className="PrintRecipeStats-statType">
          Prep time:
        </div>
        <div className="PrintRecipeStats-statValue">
          {formatTime(recipe.data.durations.prep)}
        </div>
      </div>
    }

    {!!get(recipe, 'data.durations.cook') &&
      <div className="PrintRecipeStats-stat">
        <div className="PrintRecipeStats-statType">
          Cook time:
        </div>
        <div className="PrintRecipeStats-statValue">
          {formatTime(recipe.data.durations.cook)}
        </div>
      </div>
    }

    {!!get(recipe, 'data.recipeYield') &&
      <div className="PrintRecipeStats-stat">
        <div className="PrintRecipeStats-statType">
          Servings:
        </div>
        <div className="PrintRecipeStats-statValue">
          {recipeYieldText(recipe.data.recipeYield)}
        </div>
      </div>
    }
  </div>
);

PrintRecipeStats.propTypes = {
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

export default PrintRecipeStats;
