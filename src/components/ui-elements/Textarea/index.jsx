
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';

import { ENTER } from 'constants/KeyCodes';

import './styles.css';

import Icon from 'components/ui-elements/Icon';

class Textarea extends Component {
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

    if (event.ctrlKey && event.keyCode === ENTER) {
      event.preventDefault();

      if (this.props.onSubmit) {
        this.blur();
        this.props.onSubmit(event.target.value);
      }
    }
  }

  render() {
    const {
      className, error, icon, iconStyle, placeholder, rows, value,
      onBlur, onIconClick,
    } = this.props;

    const textareaClasses = classnames(
      'Textarea',
      {
        'Textarea--icon': icon,
        'is-error': error,
      },
      className
    );

    const iconContainerClasses = classnames(
      'Textarea-iconContainer',
      { 'Textarea-iconContainer--clickable': onIconClick }
    );

    return (
      <div className={textareaClasses}>
        <div className="Textarea-fieldContainer">
          <textarea
            autoComplete="off"
            className="Textarea-field"
            placeholder={placeholder}
            ref="field"
            rows={rows}
            value={value || ''}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={onBlur}
          />
          {icon &&
            <div className={iconContainerClasses} onClick={onIconClick}>
              <Icon
                className="Textarea-icon"
                glyph={icon}
                style={iconStyle}
              />
            </div>
          }
        </div>

        {!!error &&
          <div className="Textarea-errorMessage">
            {error}
          </div>
        }
      </div>
    );
  }
}

Textarea.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.object,
  placeholder: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  rows: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onIconClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSubmit: PropTypes.func,
};

Textarea.defaultProps = {
  autoFocus: false,
  className: '',
  error: null,
  icon: '',
  iconStyle: null,
  placeholder: '',
  rows: 3,
  value: '',
  onBlur: null,
  onChange: null,
  onIconClick: null,
  onKeyDown: null,
  onSubmit: null,
};

export default Textarea;
