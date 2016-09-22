
import React, { PropTypes } from 'react';

import Avatar from 'components/ui-elements/Avatar';

const RecipeQuote = ({ recipe, profile }) => (
  <div className="RecipePage-quote">
    {profile.avatar &&
      <div className="RecipePage-quote-imageContainer">
        <Avatar
          className="RecipePage-quote-image"
          height={86}
          iconClassName="Cookbook-userProfile-avatar-icon"
          url={profile.avatar}
          width={86}
        />
      </div>
    }
    <div className="RecipePage-quote-text">
      {recipe.data.description}
    </div>
  </div>
);

RecipeQuote.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
  }).isRequired,
  recipe: PropTypes.shape({
    data: PropTypes.shape({
      description: PropTypes.string,
    }).isRequired,
  }),
};

export default RecipeQuote;
