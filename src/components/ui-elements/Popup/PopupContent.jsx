/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

class PopupContent extends Component {
  render() {
    const { children, className, isOpen } = this.props;

    return (
      <div className={classnames(className, { 'is-open': isOpen })}>
        {children}
      </div>
    );
  }
}

PopupContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default PopupContent;
