
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classnames from 'classnames';
import get from 'lodash/get';

import getSharingPath from 'components/tmp/RecipePage/helpers/getSharingPath';
import isEnoughData from 'components/tmp/RecipePage/helpers/isEnoughData';

import iconHeartFilled from 'assets/images/icons/icon-heart-filled.svg';
import iconShare from 'assets/images/icons/icon-share.svg';
import iconPen from 'assets/images/icons/icon-pen.svg';

import Button from 'components/ui-elements/Button';
import { Popup, PopupContent, PopupTrigger } from 'components/ui-elements/Popup';
import CollectionsPopup from 'components/blocks/CollectionsPopup';
import SharingIcons from 'components/tmp/SharingIcons';

const RecipeActions = ({
  className,
  isOwn,
  profile,
  recipe,
  sharingConfig,
  shouldOpenPopup,
}) => {
  const isSaved = get(recipe, 'cookbook.saved');

  const recipePageClasses = classnames(
    'RecipePage-actions',
    className
  );

  const shareGroupClasses = classnames(
    'RecipePage-actionGroup',
    { 'RecipePage-actionGroup--mobile': !isEnoughData(recipe) }
  );

  const recipePath = getSharingPath(recipe);

  const editButton = isOwn && (
    <Link to={`${recipePath}/edit`}>
      <Button
        className="RecipePage-action"
        color="grey"
        icon={iconPen}
        iconStyle={{ height: 16, width: 14 }}
        outline
      >
        Edit
      </Button>
    </Link>
  );

  const collectionsPopupClasses = classnames(
    'CollectionsPopup-inRecipeView',
    {
      'CollectionsPopup-inRecipeView--notEnoughInfo': !(
        recipe.data.description && (
          get(profile, 'avatar') ||
          get(recipe.data, 'durations.cook') ||
          get(recipe.data, 'durations.prep') ||
          recipe.data.recipeYield
        )
      ),
    }
  );

  return (
    <div className={recipePageClasses}>
      <div className="RecipePage-action-wrapper">
        <CollectionsPopup
          className={collectionsPopupClasses}
          openByDefault={shouldOpenPopup}
          recipe={recipe}
        >
          <Button
            className="RecipePage-action"
            color="danger"
            icon={iconHeartFilled}
            iconStyle={{ height: 14, width: 17 }}
            outline={!isSaved}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </CollectionsPopup>
      </div>

      <Popup className={shareGroupClasses}>
        <PopupTrigger>
          <Button
            className="RecipePage-action"
            icon={iconShare}
            iconStyle={{ height: 16, width: 14 }}
            outline
          >
            Share
          </Button>
        </PopupTrigger>

        <PopupContent className="RecipePage-action-dropdown">
          <SharingIcons
            config={sharingConfig}
            path={recipePath}
            rounded
          />
        </PopupContent>
      </Popup>

      {editButton}
    </div>
  );
};

RecipeActions.propTypes = {
  className: PropTypes.string,

  isOwn: PropTypes.bool.isRequired,

  profile: PropTypes.shape({
    avatar: PropTypes.string,
  }),

  recipe: PropTypes.shape({
    cookbook: PropTypes.shape({
      saved: PropTypes.bool,
    }),

    data: PropTypes.shape({
      description: PropTypes.string,
      durations: PropTypes.shape({
        cook: PropTypes.number,
        prep: PropTypes.number,
      }),
      recipeYield: PropTypes.number,
    }).isRequired,
  }),

  sharingConfig: PropTypes.object.isRequired,
  shouldOpenPopup: PropTypes.bool.isRequired,
};

export default RecipeActions;
