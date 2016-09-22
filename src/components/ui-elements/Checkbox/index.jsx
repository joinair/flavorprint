
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import noop from 'lodash/noop';
import partial from 'lodash/partial';

import iconRadio from 'assets/images/icons/icon-radio.svg';
import iconCheckbox from 'assets/images/icons/icon-checkbox.svg';
import './styles.css';

const Checkbox = ({ checked, disabled, label, onChange, type }) =>
  <div
    className={classnames('Checkbox', { disabled })}
    onClick={disabled ? undefined : partial(onChange, !checked)}
  >
    <input
      autoComplete="off"
      checked={checked}
      className="Checkbox-input"
      onChange={noop}
      type={type}
      name="checkbox"
    />
    <label className="Checkbox-label" htmlFor="checkbox">{label}</label>
    <div className="Checkbox-icon">
      <svg className="Checkbox-icon-svg Checkbox-icon-svg--typeCheckbox">
        <use xlinkHref={iconCheckbox} />
      </svg>
      <svg className="Checkbox-icon-svg Checkbox-icon-svg--typeRadio">
        <use xlinkHref={iconRadio} />
      </svg>
    </div>
  </div>;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
