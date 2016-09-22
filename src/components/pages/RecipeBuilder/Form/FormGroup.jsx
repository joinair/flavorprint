
import React, { PropTypes } from 'react';
import classnames from 'classnames';

const FormGroup = ({ children, label, labelClassName }) => {
  const labelClasses = classnames('RecipeBuilder-formLabel', labelClassName);

  return (
    <div className="RecipeBuilder-formGroup">
      {!!label &&
        <label className={labelClasses}>
          {label}
        </label>
      }
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default FormGroup;
