
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

const ProductCard = ({ recommendation }) => {
  const { title, originName, topFlavors } = recommendation;
  const link = get(recommendation, 'details.link');

  const image = imageUrl(recommendation);

  const lazyImage = image ? (
    <img
      alt=""
      src={image.link}
      className={classnames('ProductCard-image', {
        'ProductCard-image--horizontal': image.size[1] >= image.size[0],
      })}
    />
  ) : (
    <div className="ProductCard-fallback">
      <Icon
        className="ProductCard-fallbackIcon"
        glyph={iconDish}
      />
    </div>
  );

  const linkWrap = el => (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {el}
    </a>
  );

  const subtitle = <div className="ProductCard-subtitle">{originName}</div>;

  return (
    <div className="ProductCard">
      {linkWrap(
        <div className="ProductCard-content">
          <div className="ProductCard-imageContainer">
            {lazyImage}
          </div>

          <div className="ProductCard-content-right">
            <div className="ProductCard-title">
              {title}
            </div>

            <div className="ProductCard-discount">
              SAVE 75$
            </div>
          </div>
        </div>
      )}

      <div className="ProductCard-info">
        <div className="ProductCard-match">
          <div className="ProductCard-match-percent">
            95%
          </div>
          <div className="ProductCard-match-text">
            Match
          </div>
        </div>

        <div className="ProductCard-flavors">
          {map(topFlavors, (flavor, i) => (
            <div className="ProductCard-flavors-flavor" key={i}>
              <div
                className="ProductCard-flavors-flavor-color"
                style={{ backgroundColor: `#${flavor.hex}` }}
              />
              <div className="ProductCard-flavors-flavor-text">
                {flavor.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  recommendation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    originName: PropTypes.string.isRequired,
    details: PropTypes.object,
  }).isRequired,
};

export default ProductCard;
