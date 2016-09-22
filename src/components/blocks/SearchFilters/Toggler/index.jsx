
import React, { Component, PropTypes } from 'react';
import bind from 'lodash/bind';
import classnames from 'classnames';

import Icon from 'components/ui-elements/Icon';

import arrowDownIcon from 'assets/images/icons/icon-arrow-down.svg';

class Toggler extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { label, children } = this.props;
    const { visible } = this.state;

    const iconClassName = classnames({
      'SearchFilters-toggler-heading-icon': true,
      'SearchFilters-toggler-heading-icon--collapsed': !visible,
    });

    return (
      <div className="SearchFilters-toggler">
        <div
          className="SearchFilters-toggler-heading"
          onClick={bind(this.toggle, this)}
        >
          <span className="SearchFilters-toggler-heading-text">
            {label}
          </span>
          <Icon
            className={iconClassName}
            glyph={arrowDownIcon}
          />
        </div>
        {visible &&
          <div className="SearchFilters-toggler-body">
            {children}
          </div>
        }
      </div>
    );
  }
}

Toggler.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Toggler;
