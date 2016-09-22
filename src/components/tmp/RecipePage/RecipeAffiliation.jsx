
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import get from 'lodash/get';

import ExternalRecipeLink from 'components/tmp/RecipePage/ExternalRecipeLink';

const RecipeAffiliation = ({ isOwn, profile, recipe }) => {
  const url = recipe.externalUrl || recipe.data.sourceUrl;

  if (url) {
    return (
      <ExternalRecipeLink
        className="RecipePage-affiliation-link"
        href={url}
      >
        {get(recipe, 'data.publisher.displayName')}
      </ExternalRecipeLink>
    );
  }

  const text = `by ${profile.firstName} ${profile.lastName || ''}`;

  if (isOwn || profile.cookbookVisibility === 'public') {
    return (
      <Link
        className="RecipePage-affiliation-link"
        to={{ pathname: `/${profile.username}` }}
      >
        {text}
      </Link>
    );
  }

  return <span>{text}</span>;
};

RecipeAffiliation.propTypes = {
  isOwn: PropTypes.bool.isRequired,

  profile: PropTypes.shape({
    cookbookVisibility: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
  }),

  recipe: PropTypes.shape({
    externalUrl: PropTypes.string,
  }),
};

export default RecipeAffiliation;
