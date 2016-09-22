
import React, { PropTypes } from 'react';

const Icon = ({ className, glyph, style }) => (
  <svg className={className} style={style}>
    <use xlinkHref={glyph} />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  glyph: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Icon;
