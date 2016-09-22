
import React, { PropTypes } from 'react';

const FormControl = ({ children }) => (
  <div className="Settings-formControl">
    {children}
  </div>
);

FormControl.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormControl;
