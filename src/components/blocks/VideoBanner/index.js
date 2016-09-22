/* eslint react/no-did-mount-set-state:0 */

import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import config from 'constants/Config';

const prefix =
  `https://${config.cloudinary.cloudName}-res.cloudinary.com/video/upload`;

const sources = {
  mp4: `${prefix}/v1462188091/videos/whisk--banner-v2.mp4`,
  webm: `${prefix}/v1462186348/videos/whisk-banner-v2.webm`,
};

class VideoBanner extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, mounted: false };
    this.play = bind(this.play, this);
  }

  componentDidMount() {
    const isMobile = require('ismobilejs').any;
    if (!isMobile) { this.setState({ mounted: true }); }
  }

  play() {
    this.setState({ loaded: true });
  }

  render() {
    const { className } = this.props;
    const { loaded, mounted } = this.state;

    const video = mounted && (
      <video
        autoPlay
        className={className}
        loop
        style={loaded ? {} : { display: 'none' }}
        onCanPlayThrough={this.play}
      >
        <source src={sources.webm} type="video/webm" />
        <source src={sources.mp4} type="video/mp4" />
      </video>
    );

    return (
      <div>
        <img
          className={className}
          role="presentation"
          src="/assets/images/static-images/whisk-video-poster-v2.1.jpg"
        />

        {video}
      </div>
    );
  }
}

VideoBanner.propTypes = {
  className: PropTypes.string,
};

export default VideoBanner;
