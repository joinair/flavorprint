
import React, { PropTypes } from 'react';

import map from 'lodash/map';

const FormControlRow = ({ children }) => (
  <div className="Settings-formControl-row">
    {map(children, (child, key) =>
      <div className="Settings-formControl-column" key={key}>
        {child}
      </div>
    )}
  </div>
);

FormControlRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormControlRow;
