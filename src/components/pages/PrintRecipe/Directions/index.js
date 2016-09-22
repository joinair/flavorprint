
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import './styles.css';

const PrintRecipeDirections = ({ recipe, external }) => {
  if (external && (recipe.data.publisher.name !== 'about.com')) {
    return (
      <div className="PrintRecipeDirections">
        View full directions at{' '}
        <span className="PrintRecipeDirections-source">
          {recipe.data.publisher.displayName}
        </span>
      </div>
    );
  }

  const itemList = map(recipe.data.instructions, (item, index) =>
    <div className="PrintRecipeDirections-direction" key={index}>
      {item.text}
    </div>
  );

  return (
    <div className="PrintRecipeDirections">
      {itemList}
    </div>
  );
};

PrintRecipeDirections.propTypes = {
  external: PropTypes.bool,
  recipe: PropTypes.shape({
    data: PropTypes.shape({
      instructions: PropTypes.array.isRequired,
    }).isRequired,
    publisher: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default PrintRecipeDirections;
