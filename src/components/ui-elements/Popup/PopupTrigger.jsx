/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';

class PopupTrigger extends Component {
  render() {
    const { children, className } = this.props;

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

PopupTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PopupTrigger;
