
import React, { PropTypes } from 'react';

import classnames from 'classnames';

const FormGroup = ({
  children, className,
  label, labelClassName,
  multiline, multilineButtons, noDivider, topDivider,
}) => {
  const groupClasses = classnames(
    'Settings-formGroup',
    {
      'Settings-formGroup--multiline': multiline,
      'Settings-formGroup--multilineButtons': multilineButtons,
      'Settings-formGroup--topDivider': topDivider,
      'Settings-formGroup--noDivider': noDivider,
    },
    className
  );

  const labelClasses = classnames('Settings-formLabel', labelClassName);

  return (
    <div className={groupClasses}>
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
  className: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  multiline: PropTypes.bool,
  multilineButtons: PropTypes.bool,
  noDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
};

export default FormGroup;
