
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';

import { ENTER } from 'constants/KeyCodes';

import './styles.css';

import Icon from 'components/ui-elements/Icon';

class Input extends Component {
  constructor(props) {
    super(props);

    this.focus = bind(this.focus, this);
    this.handleChange = bind(this.handleChange, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  blur() {
    this.refs.field.blur();
  }

  focus() {
    const field = this.refs.field;
    const value = field.value;

    field.focus();
    field.value = '';
    field.value = value;
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  handleKeyDown(event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    if (this.props.onSubmit && event.keyCode === ENTER) {
      event.preventDefault();

      this.blur();
      this.props.onSubmit(event.target.value);
    }
  }

  render() {
    const {
      className, error, icon, iconStyle,
      autoFocus, placeholder, size, type, value,
      onBlur, onIconClick, name,
    } = this.props;

    const inputClasses = classnames(
      'Input',
      {
        [`Input--${size}`]: size,
        'Input--icon': icon,
        'is-error': error,
      },
      className
    );

    const iconContainerClasses = classnames(
      'Input-iconContainer',
      { 'Input-iconContainer--clickable': onIconClick }
    );

    return (
      <div className={inputClasses}>
        <div className="Input-fieldContainer">
          <input
            autoComplete="off"
            autoFocus={autoFocus}
            className="Input-field"
            placeholder={placeholder}
            ref="field"
            type={type}
            value={value || ''}
            name={name}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={onBlur}
          />
          {icon &&
            <div className={iconContainerClasses} onClick={onIconClick}>
              <Icon
                className="Input-icon"
                glyph={icon}
                style={iconStyle}
              />
            </div>
          }
        </div>

        {!!error && typeof error === 'string' &&
          <div className="Input-errorMessage">
            {error}
          </div>
        }
      </div>
    );
  }
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  type: PropTypes.oneOf(['text', 'password', 'email', 'search', 'tel', 'url']),
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onIconClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSubmit: PropTypes.func,
};

Input.defaultProps = {
  autoFocus: false,
  className: '',
  error: null,
  icon: '',
  iconStyle: null,
  placeholder: '',
  size: 'normal',
  type: 'text',
  value: '',
  onBlur: null,
  onChange: null,
  onIconClick: null,
  onKeyDown: null,
  onSubmit: null,
};

export default Input;
