
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import './styles.css';

const Mark = ({ width, height, mark }) => (
  <div className="Mark" style={{ width, height: (height || width) }}>
    {map(mark.images, (image, i) => (
      <img alt="" key={i} src={image} />
    ))}
  </div>
);

Mark.propTypes = {
  mark: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,

  width: PropTypes.number.isRequired,
  height: PropTypes.number,
};

Mark.defaultProps = {
  width: 384,
};

export default Mark;
