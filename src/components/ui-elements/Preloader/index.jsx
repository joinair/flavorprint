
import React, { PropTypes } from 'react';
import classnames from 'classnames';

import './styles.css';

const Preloader = ({ className }) =>
  <div className={classnames('Preloader', className)}>
    <div className="Preloader-wrapper">
      <div className="Preloader-spinnerLayer">
        <div className="Preloader-circleClipper Preloader-circleClipper--left">
          <div className="Preloader-circle Preloader-circle--leftSpin"></div>
        </div>
        <div className="Preloader-gapPatch Preloader-circleClipper--right">
          <div className="Preloader-gapPatch-circle"></div>
        </div>
        <div className="Preloader-circleClipper">
          <div className="Preloader-circle Preloader-circle--rightSpin"></div>
        </div>
      </div>
    </div>
  </div>;

export const CenteredPreloader = () =>
  <div className="PreloaderContainer">
    <Preloader />
  </div>;

Preloader.propTypes = {
  className: PropTypes.string,
};

export default Preloader;
