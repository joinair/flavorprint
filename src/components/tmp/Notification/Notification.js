
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import get from 'lodash/get';

import Timer from 'helpers/Timer';

import Box from './Box';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.stopTimerIfNeeded = bind(this.stopTimerIfNeeded, this);
    this.startTimerIfNeeded = bind(this.startTimerIfNeeded, this);
    this.handleMouseEnter = bind(this.handleMouseEnter, this);
    this.handleMouseLeave = bind(this.handleMouseLeave, this);
  }
  componentDidMount() {
    this.startTimerIfNeeded(this.props);
  }
  componentWillReceiveProps(nextProps) {
    const currentUUID = get(this.props.notification, 'uuid');
    const nextUUID = get(nextProps.notification, 'uuid');

    if (currentUUID !== nextUUID) {
      this.startTimerIfNeeded(nextProps);
    }
  }
  componentWillUnmount() {
    this.stopTimerIfNeeded();
  }
  stopTimerIfNeeded() {
    if (this._notificationTimer) {
      this._notificationTimer.clear();
    }
  }
  startTimerIfNeeded(props) {
    this.stopTimerIfNeeded();

    const { autoDismiss, notification, onDismiss } = props;

    if (notification && autoDismiss) {
      this._notificationTimer = new Timer(onDismiss, autoDismiss);
    }
  }
  handleMouseEnter() {
    if (this._notificationTimer) {
      this._notificationTimer.pause();
    }
  }
  handleMouseLeave() {
    if (this._notificationTimer) {
      this._notificationTimer.resume();
    }
  }
  render() {
    if (!this.props.notification) return null;

    return (
      <Box
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
        notification={this.props.notification}
        onDismiss={this.props.onDismiss}
      />
    );
  }
}

Notification.propTypes = {
  autoDismiss: PropTypes.number,
  notification: PropTypes.shape({
    text: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }),

  onDismiss: PropTypes.func.isRequired,
};

export default Notification;
