
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import iconDish from 'assets/images/icons/icon-dish.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';

const imageUrl = rec => {
  const minWidth = 580;
  const minHeight = 580;

  let imageUrls = get(rec, 'details.images', []);
  imageUrls = filter(imageUrls, 'link');

  const parsed = map(imageUrls, ({ size, link }) => ({
    link,
    size: map(size.split('x'), parseFloat),
  }));
  const sorted = sortBy(parsed, x => Math.min(x.size));

  const image = find(sorted, ({ size }) => (
    size[0] >= minWidth && size[1] >= minHeight
  ));

  return image || parsed[0];
};

const RecipeCard = ({ recommendation }) => {
  const { title, originName, topFlavors } = recommendation;
  const link = get(recommendation, 'details.link');

  const image = imageUrl(recommendation);

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
        {linkWrap(
          <div className="RecipeCard-imageContainer">
            {lazyImage}
          </div>
        )}

        {linkWrap(
          <div className="RecipeCard-content">
            <div className="RecipeCard-title">
              {title}
            </div>

            {subtitle}
          </div>
        )}

        <div className="RecipeCard-info">
          <div className="RecipeCard-match">
            <div className="RecipeCard-match-percent">
              95%
            </div>
            <div className="RecipeCard-match-text">
              Match
            </div>
          </div>

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
};

export default RecipeCard;
