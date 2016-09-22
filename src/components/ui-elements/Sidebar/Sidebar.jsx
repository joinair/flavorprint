
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';

import { on, off } from 'helpers/event';

import './styles.css';

import BodyClassName from 'components/ui-elements/BodyClassName';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = bind(this.handleDocumentClick, this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen === nextProps.isOpen && global.Platform.OS !== 'browser') {
      return undefined;
    }

    if (nextProps.isOpen) {
      on(document, 'click', this.handleDocumentClick, true);
    } else {
      off(document, 'click', this.handleDocumentClick, true);
    }
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }

  handleDocumentClick(event) {
    if (this.props.isModalOpened) return undefined;

    const container = this.refs.container;

    if (!container || !container.contains(event.target)) {
      this.props.onSidebarClose();
    }
  }

  render() {
    const {
      children,
      className,
      isOpen,
    } = this.props;

    if (!isOpen) { return false; }

    const sidebarClassName = classnames('Sidebar', { 'is-open': isOpen });

    const containerClassName = classnames('Sidebar-container', className, {
      'Sidebar-container--left': this.props.left,
      'Sidebar-container--right': this.props.right,
    });

    const content = isOpen && (
      <div ref="container" className={containerClassName}>
        <BodyClassName className="is-sidebarOpened" />
        {children}
      </div>
    );

    return <div className={sidebarClassName}>{content}</div>;
  }
}

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  isModalOpened: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
  onSidebarClose: PropTypes.func.isRequired,
};

export default Sidebar;
