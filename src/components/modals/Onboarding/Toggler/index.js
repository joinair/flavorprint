
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';
import isNumber from 'lodash/isNumber';

import Icon from 'components/ui-elements/Icon';

import arrowDownIcon from 'assets/images/icons/icon-arrow-down.svg';
import './styles.css';

class OnboardingToggler extends Component {
  constructor(props) {
    super(props);

    this.toggle = bind(this.toggle, this);

    this.state = {
      open: props.open,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
    }
  }

  toggle() {
    const value = !this.state.open;

    this.setState({ open: value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  }

  renderCount() {
    const { count } = this.props;

    if (isNumber(count)) {
      const rootClasses = classnames('OnboardingToggler-count', {
        'is-zero': count === 0,
      });

      return (
        <span className={rootClasses}>
          {count}
        </span>
      );
    }
  }

  render() {
    const { label, children } = this.props;
    const { open } = this.state;

    const rootClasses = classnames('OnboardingToggler', {
      'is-open': open,
    });

    return (
      <div className={rootClasses}>
        <div
          className="OnboardingToggler-heading"
          onClick={this.toggle}
        >
          <span className="OnboardingToggler-text">
            {label}
            {this.renderCount()}
          </span>

          <Icon
            className="OnboardingToggler-icon"
            glyph={arrowDownIcon}
            style={{ height: '9px', width: '15px' }}
          />
        </div>

        <div className="OnboardingToggler-content">
          {children}
        </div>
      </div>
    );
  }
}

OnboardingToggler.propTypes = {
  children: PropTypes.any,
  count: PropTypes.number,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onChange: PropTypes.func,
};

OnboardingToggler.defaultProps = {
  open: false,
};

export default OnboardingToggler;
