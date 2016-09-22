
import React, { PropTypes } from 'react';

import get from 'lodash/get';

import './styles.css';

const PrintRecipeAffiliation = ({ recipe, profile }) => {
  if (recipe.externalUrl) {
    return (
      <div className="PrintRecipeAffiliation">
        from{' '}
        <span className="PrintRecipeAffiliation-source">
          {get(recipe, 'data.publisher.displayName')}
        </span>
      </div>
    );
  }

  return (
    <div className="PrintRecipeAffiliation">
      by{' '}
      <span className="PrintRecipeAffiliation-source">
        {profile.firstName} {profile.lastName || ''}
      </span>
    </div>
  );
};

PrintRecipeAffiliation.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  recipe: PropTypes.shape({
    externalUrl: PropTypes.string,
  }),
};

export default PrintRecipeAffiliation;
