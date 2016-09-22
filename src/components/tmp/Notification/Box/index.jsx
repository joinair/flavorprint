
import React, { PropTypes } from 'react';

import iconClose from 'assets/images/icons/icon-close.svg';

import Icon from 'components/ui-elements/Icon';

import './styles.css';

const Box = ({
  handleMouseEnter,
  handleMouseLeave,
  notification,
  onDismiss,
}) => (
  <div
    className="Notification"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div className="Notification-container">
      <div className="Notification-text">
        {notification.text}
      </div>
      <div
        className="Notification-dismiss"
        onClick={onDismiss}
      >
        <Icon
          className="Notification-dismissIcon"
          glyph={iconClose}
        />
      </div>
    </div>
  </div>
);

Box.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Box;
