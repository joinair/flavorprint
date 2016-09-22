
import React, { Component, PropTypes, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import map from 'lodash/map';

import { on, off } from 'helpers/event';

import { ESCAPE } from 'constants/KeyCodes';

export { default as PopupContent } from './PopupContent';
import PopupContent from './PopupContent';

export { default as PopupTrigger } from './PopupTrigger';
import PopupTrigger from './PopupTrigger';

export class Popup extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.handleDocumentKeyDown = bind(this.handleDocumentKeyDown, this);

    this.state = { isOpen: false };
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
    on(document, 'keydown', this.handleDocumentKeyDown);
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
    off(document, 'keydown', this.handleDocumentKeyDown);
  }

  getChildren() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return map(children, child => {
      if (child === null) {
        return null;
      }

      if (!(child.type === PopupContent || child.type === PopupTrigger)) {
        return child;
      }

      const key = child.type === PopupContent ? 'content' : 'trigger';
      return cloneElement(child, { isOpen, key, ref: key });
    });
  }

  handleDocumentClick(event) {
    const content = findDOMNode(this.refs.content);
    const trigger = findDOMNode(this.refs.trigger);

    if (content && content.contains(event.target) && !this.props.closeOnContentClick) {
      return undefined;
    } else if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else if (trigger && trigger.contains(event.target)) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  handleDocumentKeyDown(event) {
    if (event.keyCode === ESCAPE) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        {this.getChildren()}
      </div>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeOnContentClick: PropTypes.bool,
};

Popup.defaultProps = {
  closeOnContentClick: true,
};

export default { Popup, PopupContent, PopupTrigger };
