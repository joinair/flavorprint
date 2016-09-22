/* eslint react/no-did-mount-set-state:0 */

import React, { Component, PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';

import bind from 'lodash/bind';
import classnames from 'classnames';

import { addGeometry, getSrc, getSrcSet } from 'helpers/cloudinary';
import getImageSize from 'helpers/getImageSize';

import './styles.css';
import LoadableImage from './LoadableImage';

class LazyImage extends Component {
  constructor(props) {
    super(props);

    this.handlePreviewLoad = bind(this.handlePreviewLoad, this);

    const { image, maxHeight, maxWidth } = props;

    this.state = {
      containerStyles: getImageSize(image, { maxWidth, maxHeight }),
      isPreviewLoaded: false,
    };
  }

  componentDidMount() {
    const { containerStyles: { width, height } } = this.state;

    const containerRatio = width / height;
    const containerWidth = this.refs.container.offsetWidth;

    if (width > containerWidth) {
      this.setState({
        containerStyles: {
          width: containerWidth,
          height: containerWidth / containerRatio,
        },
      });
    }
  }

  handlePreviewLoad() {
    this.setState({ isPreviewLoaded: true });
  }

  render() {
    const {
      className, title,
      image, maxHeight, maxWidth,
      previewTransformation, transformation,
    } = this.props;
    const { containerStyles, isPreviewLoaded } = this.state;

    const geometry = getImageSize(image, { maxWidth, maxHeight });
    const retinaGeometry = getImageSize(image, { maxWidth, maxHeight, pixelRatio: 2 });
    const passSrcSet = (retinaGeometry.width / geometry.width) >= 1.6;

    return (
      <div className={classnames('LazyImage', className)}>
        <div
          className="LazyImage-container"
          ref="container"
          style={isPreviewLoaded ? {} : containerStyles}
        >
          <LoadableImage
            className="LazyImage-image"
            src={getSrc(image.url, addGeometry(previewTransformation, geometry))}
            srcSet={
              passSrcSet
                ? getSrcSet(image.url, addGeometry(previewTransformation, retinaGeometry))
                : ''
            }
            title={title}
            onLoad={this.handlePreviewLoad}
          />
          {isPreviewLoaded &&
            <LazyLoad>
              <LoadableImage
                className="LazyImage-image LazyImage-image--large"
                src={getSrc(image.url, addGeometry(transformation, geometry))}
                srcSet={
                  passSrcSet
                    ? getSrcSet(image.url, addGeometry(transformation, retinaGeometry))
                    : ''
                }
                title={title}
              />
            </LazyLoad>
          }
        </div>
      </div>
    );
  }
}

LazyImage.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
  }).isRequired,
  maxHeight: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  previewTransformation: PropTypes.string.isRequired,
  title: PropTypes.string,
  transformation: PropTypes.string.isRequired,
};

export default LazyImage;
