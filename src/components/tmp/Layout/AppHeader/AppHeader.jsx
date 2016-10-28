
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classnames from 'classnames';

import {
  PRODUCTS,
  RECIPES,
  FLAVORPRINT,
} from 'constants/Routes';

import Icon from 'components/ui-elements/Icon';

import iconNav from 'assets/images/icons/icon-mobile-nav.svg';
import fpLogo from 'assets/images/icons/fp-logo.svg';
import './styles.css';

import UserMenu from './UserMenu';

const GuestMenu = ({ onLogInButtonClick, onSignUpButtonClick }) => {
  const onAuth = callback => event => {
    event.preventDefault();
    callback();
  };

  return (
    <div>
      <div className="AppHeader-item AppHeader-item--desktop">
        <a
          className="AppHeader-link"
          href="/"
          onClick={onAuth(onSignUpButtonClick)}
        >
          <span className="AppHeader-link-text">Sign Up</span>
        </a>
      </div>
      <div className="AppHeader-item AppHeader-item--desktop">
        <a
          className="AppHeader-link"
          href="/"
          onClick={onAuth(onLogInButtonClick)}
        >
          <span className="AppHeader-link-text">Log In</span>
        </a>
      </div>
    </div>
  );
};

const Menu = ({
  mark,
  email,
  firstName,
  isAuthenticated,
  lastName,
  routerPath,

  onLogInButtonClick,
  onLogOut,
  onSidebarOpen,
  onSignUpButtonClick,
}) => {
  const isLinkActive = (current, link) => current === link;

  const menu = isAuthenticated
    ? (
      <UserMenu
        email={email}
        firstName={firstName}
        lastName={lastName}
        mark={mark}
        onLogOut={onLogOut}
      />
    ) : (
      <GuestMenu
        onLogInButtonClick={onLogInButtonClick}
        onSignUpButtonClick={onSignUpButtonClick}
      />
    );

  return (
    <div className="AppHeader-menu">
      <div className="AppHeader-item AppHeader-item--mobile">
        <a className="AppHeader-link" onClick={onSidebarOpen}>
          <svg className="AppHeader-iconMobileNav">
            <use xlinkHref={iconNav} />
          </svg>
        </a>
      </div>

      <div className="AppHeader-item AppHeader-item--logo">
        <Link to={{ pathname: '/' }} className="AppHeader-link AppHeader-link--logo">
          <Icon
            glyph={fpLogo}
            style={{
              fill: 'black',
              width: 232,
              height: 25,
            }}
          />
        </Link>
      </div>

      <div
        className={
          classnames(
            'AppHeader-item AppHeader-item--desktop',
            {
              'is-active': isLinkActive(routerPath, RECIPES) ||
                isLinkActive(routerPath, PRODUCTS),
            }
          )
        }
      >
        <Link to={RECIPES} className="AppHeader-link">
          <span className="AppHeader-link-text">Just for you</span>
        </Link>
      </div>

      <div
        className={
          classnames(
            'AppHeader-item AppHeader-item--desktop',
            { 'is-active': isLinkActive(routerPath, FLAVORPRINT) }
          )
        }
      >
        <Link to={FLAVORPRINT} className="AppHeader-link">
          <span className="AppHeader-link-text">FlavorPrint</span>
        </Link>
      </div>

      <div className="AppHeader-item AppHeader-item--desktop AppHeader-item--flex" />

      {menu}
    </div>
  );
};

const AppHeader = ({
  isAuthenticated,
  profile: {
    mark,
    email,
    firstName,
    lastName,
  },
  routerPath,

  onLogInButtonClick,
  onLogOut,
  onSidebarOpen,
  onSignUpButtonClick,
}) => (
  <div className="AppHeader LayoutFlex-aside is-filled">
    <div className="AppHeader-natural">
      <div className="AppHeader-container">
        <Menu
          email={email}
          firstName={firstName}
          isAuthenticated={isAuthenticated}
          lastName={lastName}
          mark={mark}
          routerPath={routerPath}
          onLogInButtonClick={onLogInButtonClick}
          onLogOut={onLogOut}
          onSidebarOpen={onSidebarOpen}
          onSignUpButtonClick={onSignUpButtonClick}
        />
      </div>
    </div>
    <div className="AppHeader-substitute" />
  </div>
);

GuestMenu.propTypes = {
  onLogInButtonClick: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

Menu.propTypes = {
  mark: PropTypes.object,
  email: PropTypes.string,
  firstName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  lastName: PropTypes.string,
  routerPath: PropTypes.string,

  onLogInButtonClick: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onSidebarOpen: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  routerPath: PropTypes.string,

  onLogInButtonClick: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onSidebarOpen: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

export default AppHeader;
