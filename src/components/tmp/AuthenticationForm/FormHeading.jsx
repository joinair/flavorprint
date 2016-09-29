
import React, { PropTypes } from 'react';

const FormHeading = ({ children }) => (
  <div className="AuthenticationForm-heading">
    <div className="AuthenticationForm-heading-fp" />
    <div className="AuthenticationForm-heading-text">
      {children}
    </div>
  </div>
);

FormHeading.propTypes = {
  children: PropTypes.node,
};

export default FormHeading;
