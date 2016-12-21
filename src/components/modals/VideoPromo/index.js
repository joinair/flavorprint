
import React, { PropTypes } from 'react';

import ModalHeader from 'components/tmp/Modal/ModalHeader';

import './styles.css';

const VideoPromo = ({ onClose }) => (
  <div className="VideoPromo">
    <ModalHeader
      className="VideoPromo-header"
      title="&nbsp;"
      onHide={onClose}
    />

    <div className="VideoPromo-content">
      <iframe
        allowFullScreen
        frameBorder="0"
        src="https://www.youtube.com/embed/n85Q5pmRHGc?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1"
        width="640"
        height="360"
      />
    </div>
  </div>
);

VideoPromo.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default VideoPromo;
