
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import './styles.css';

const Mark = ({ mark }) => (
  <div className="Mark">
    {map(mark.images, (image, i) => (
      <img alt="" key={i} src={image} />
    ))}
  </div>
);

Mark.propTypes = {
  mark: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default Mark;
