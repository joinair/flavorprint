
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import get from 'lodash/get';
import map from 'lodash/map';
import partial from 'lodash/partial';

import { likeState } from 'helpers/interactions';
import { recipeImageUrl } from 'helpers/recipe';

import iconDish from 'assets/images/icons/icon-dish.svg';
import iconDislike from 'assets/images/icons/icon-dislike.svg';
import iconLike from 'assets/images/icons/icon-like.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';

const RecipeCard = ({
  recommendation,
  onLike,
  onDislike,
}) => {
  const {
    title,
    originName,
    topFlavors,
    compatibilityScore,
  } = recommendation;
  const link = get(recommendation, 'details.link');

  const image = recipeImageUrl(recommendation);

  const likeStateVal = likeState(recommendation) || recommendation.pendingInteraction;

  const lazyImage = image ? (
    <img
      alt=""
      src={image.link}
      className={classnames('RecipeCard-image', {
        'RecipeCard-image--horizontal': image.size[1] >= image.size[0],
      })}
    />
  ) : (
    <div className="RecipeCard-fallback">
      <Icon
        className="RecipeCard-fallbackIcon"
        glyph={iconDish}
      />
    </div>
  );

  const linkWrap = el => (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {el}
    </a>
  );

  const subtitle = <div className="RecipeCard-subtitle">{originName}</div>;

  return (
    <div className="RecipeCard">
      <div className="RecipeCard-container">
        <div className="RecipeCard-imageContainer">
          {linkWrap(lazyImage)}
          <div className="RecipeCard-imageLikes">
            <div
              className={classnames('RecipeCard-like', {
                'RecipeCard-like--green': likeStateVal === 'liked',
              })}
              onClick={likeStateVal !== 'liked' && partial(onLike, recommendation)}
            >
              <Icon glyph={iconLike} className="RecipeCard-like-icon" />
            </div>
            <div
              className={classnames('RecipeCard-like', {
                'RecipeCard-like--red': likeStateVal === 'disliked',
              })}
              onClick={likeStateVal !== 'disliked' && partial(onDislike, recommendation)}
            >
              <Icon glyph={iconDislike} className="RecipeCard-like-icon" />
            </div>
          </div>
        </div>

        {linkWrap(
          <div className="RecipeCard-content">
            <div className="RecipeCard-title">
              {title}
            </div>

            {subtitle}
          </div>
        )}

        <div className="RecipeCard-info">
          {(compatibilityScore === 0 || compatibilityScore) && (
            <div className="RecipeCard-match">
              <div className="RecipeCard-match-percent">
                {Math.round(compatibilityScore)}%
              </div>
              <div className="RecipeCard-match-text">
                Match
              </div>
            </div>
          )}

          <div className="RecipeCard-flavors">
            {map(topFlavors, (flavor, i) => (
              <div className="RecipeCard-flavors-flavor" key={i}>
                <div
                  className="RecipeCard-flavors-flavor-color"
                  style={{ backgroundColor: `#${flavor.hex}` }}
                />
                <div className="RecipeCard-flavors-flavor-text">
                  {flavor.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recommendation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    originName: PropTypes.string.isRequired,
    details: PropTypes.object,
  }).isRequired,

  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default RecipeCard;
