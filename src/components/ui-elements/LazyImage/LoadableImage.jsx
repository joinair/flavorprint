
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';

import { on, off } from 'helpers/event';

class LoadableImage extends Component {
  constructor(props) {
    super(props);

    this.handleImageLoad = bind(this.handleImageLoad, this);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    const { image } = this.refs;

    if (image.complete && image.naturalWidth) {
      this.handleImageLoad();
    } else {
      on(image, 'load', this.handleImageLoad);
    }
  }

  componentWillUnmount() {
    off(this.refs.image, 'load', this.handleImageLoad);
  }

  handleImageLoad() {
    this.setState({ isLoaded: true });

    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render() {
    const { className, src, srcSet, style, title } = this.props;
    const { isLoaded } = this.state;

    const imageClasses = classnames(
      'LoadableImage',
      { 'is-loaded': isLoaded },
      className
    );

    return (
      <img
        alt=""
        className={imageClasses}
        ref="image"
        src={src}
        srcSet={srcSet}
        style={style}
        title={title}
      />
    );
  }
}

LoadableImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  onLoad: PropTypes.func,
};

export default LoadableImage;
