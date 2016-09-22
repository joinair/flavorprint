
import React, { PropTypes } from 'react';

import getSharingPath from 'components/tmp/RecipePage/helpers/getSharingPath';

import './styles.css';

import PrintButton from './Button';
import SharingIcons from 'components/tmp/SharingIcons';

const RecipePagePrint = ({ recipe, sharingConfig }) => (
  <div className="RecipePagePrint">
    <div className="RecipePagePrint-button">
      <PrintButton recipe={recipe} />
    </div>

    <div className="RecipePage-share RecipePage-share--small">
      <div className="RecipePage-share-text">
        Share recipe:
      </div>
      <SharingIcons
        config={sharingConfig}
        path={getSharingPath(recipe)}
        small
      />
    </div>
  </div>
);

RecipePagePrint.propTypes = {
  recipe: PropTypes.object.isRequired,
  sharingConfig: PropTypes.object.isRequired,
};

export default RecipePagePrint;
