
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

import classnames from 'classnames';
import bind from 'lodash/bind';

import { on, off } from 'helpers/event';

import iconSettings from 'assets/images/icons/icon-mobile-settings.svg';
import iconLogout from 'assets/images/icons/icon-mobile-logout.svg';
import Icon from 'components/ui-elements/Icon';

import './styles.css';
import Avatar from 'components/ui-elements/Avatar';

const linkIconClasses = name =>
  `AppHeader-user-dropdown-link-icon AppHeader-user-dropdown-link-icon--${name}`;

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.state = { isOpen: false };
  }
  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }
  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }
  handleDocumentClick(event) {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else if (findDOMNode(this.refs.trigger).contains(event.target)) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }
  render() {
    const { avatar, email, firstName, onLogOut } = this.props;
    const { isOpen } = this.state;

    const menuClasses = classnames(
      'AppHeader-user AppHeader-item AppHeader-item--desktop',
      { 'is-open': isOpen }
    );

    const username = firstName || email;

    return (
      <div className={menuClasses}>
        <div className="AppHeader-user-container">
          <div
            className="AppHeader-link AppHeader-user-title"
            ref="trigger"
          >
            <Avatar
              className="AppHeader-user-avatar"
              height={34}
              iconClassName="AppHeader-user-avatar-icon"
              url={avatar}
              width={34}
            />
            <span className="AppHeader-link-text AppHeader-user-name">
              {username}
            </span>
          </div>
          <div className="AppHeader-user-dropdown">
            <div className="AppHeader-user-dropdown-container">
              <div className="AppHeader-user-dropdown-item">
                <Link to={{ pathname: '/settings' }} className="AppHeader-user-dropdown-link">
                  <div className="AppHeader-user-dropdown-link-iconContainer">
                    <Icon
                      className={linkIconClasses('settings')}
                      glyph={iconSettings}
                    />
                  </div>
                  <div className="AppHeader-user-dropdown-link-text">Settings</div>
                </Link>
              </div>
              <div className="AppHeader-user-dropdown-item">
                <a onClick={onLogOut} className="AppHeader-user-dropdown-link">
                  <div className="AppHeader-user-dropdown-link-iconContainer">
                    <Icon
                      className={linkIconClasses('logout')}
                      glyph={iconLogout}
                    />
                  </div>
                  <div className="AppHeader-user-dropdown-link-text">Log out</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserMenu.propTypes = {
  avatar: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onLogOut: PropTypes.func.isRequired,
};

export default UserMenu;
