
import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import bind from 'lodash/bind';
import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import { on, off } from 'helpers/event';

import './styles.css';

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

class ProductCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadError = bind(this.onLoadError, this);
    this.state = { fallbackImage: false };
  }

  componentDidMount() {
    on(this.refs.image, 'error', this.onLoadError);
  }

  componentWillUnmount() {
    off(this.refs.image, 'error', this.onLoadError);
  }

  onLoadError() {
    this.setState({ fallbackImage: true });
  }

  render() {
    const { recommendation } = this.props;
    const { fallbackImage } = this.state;

    const { title, topFlavors } = recommendation;
    const link = get(recommendation, 'details.link');

    const image = imageUrl(recommendation);

    const imageSrc = get(
      fallbackImage ? undefined : image,
      'link',
      '/assets/images/static-images/product-placeholder.png'
    );

    const imageSrc2x = get(
      fallbackImage ? undefined : image,
      'link',
      '/assets/images/static-images/product-placeholder@2x.png'
    );

    const lazyImage = (
      <img
        alt=""
        src={imageSrc}
        srcSet={`${imageSrc2x} 2x`}
        ref="image"
        className={classnames('ProductCard-image', {
          'ProductCard-image--horizontal': image && image.size[1] >= image.size[0],
        })}
      />
    );

    const linkWrap = el => (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {el}
      </a>
    );

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
  }
}

ProductCard.propTypes = {
  recommendation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    originName: PropTypes.string.isRequired,
    details: PropTypes.object,
  }).isRequired,
};

export default ProductCard;
