
import React, { PropTypes } from 'react';

import Input from 'components/ui-elements/Input';

import changeHandler from './changeHandler';

const Servings = ({ label, minValue, value, onChange }) => {
  const handleChange = changeHandler({ onChange, minValue });

  return (
    <div className="Settings-servings">
      <div className="Settings-servings-container">
        <div className="Settings-servings-field">
          <Input
            placeholder={minValue}
            value={value === 0 ? '0' : value}
            onChange={handleChange}
          />
        </div>
        <div className="Settings-servings-label">
          {label}
        </div>
      </div>
    </div>
  );
};

Servings.propTypes = {
  label: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Servings;
