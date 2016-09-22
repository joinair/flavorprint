
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';

import { ENTER } from 'constants/KeyCodes';

class FormDropdown extends Component {
  constructor(props) {
    super(props);

    this.focus = bind(this.focus, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
  }

  focus() {
    this.refs.field.focus();
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER) {
      event.preventDefault();

      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
    }
  }

  render() {
    const {
      children, className, isError, placeholder, value,
      onChange,
    } = this.props;

    const dropdownClasses = classnames('RecipeBuilder-formDropdown', className);
    const fieldClasses = classnames(
      'RecipeBuilder-formDropdown-field',
      { 'is-error': isError }
    );

    return (
      <div className={dropdownClasses}>
        <div className="RecipeBuilder-formDropdown-fieldContainer">
          <input
            autoComplete="off"
            className={fieldClasses}
            placeholder={placeholder}
            ref="field"
            value={value || ''}
            onChange={onChange}
            onKeyDown={this.handleKeyDown}
          />
          {children}
        </div>
      </div>
    );
  }
}

FormDropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isError: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default FormDropdown;
