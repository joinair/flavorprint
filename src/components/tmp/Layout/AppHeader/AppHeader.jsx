
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classnames from 'classnames';
import includes from 'lodash/includes';

import {
  HOME,
  LOG_IN,
  PRODUCTS,
  RECIPES,
  SIGN_UP,
} from 'constants/Routes';

import iconLogo from 'assets/images/icons/whisk-logo.svg';
import iconNav from 'assets/images/icons/icon-mobile-nav.svg';
import iconSearch from 'assets/images/icons/icon-search.svg';
import './styles.css';

import RecipeSearchField from './RecipeSearchField';
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
          href={SIGN_UP}
          onClick={onAuth(onSignUpButtonClick)}
        >
          <span className="AppHeader-link-text">Sign Up</span>
        </a>
      </div>
      <div className="AppHeader-item AppHeader-item--desktop">
        <a
          className="AppHeader-link"
          href={LOG_IN}
          onClick={onAuth(onLogInButtonClick)}
        >
          <span className="AppHeader-link-text">Log In</span>
        </a>
      </div>
    </div>
  );
};

const Menu = ({
  avatar,
  email,
  firstName,
  isAuthenticated,
  lastName,
  routerPath,
  username,

  onLogInButtonClick,
  onLogOut,
  onSearch,
  onSidebarOpen,
  onSignUpButtonClick,
}) => {
  const isLinkActive = (current, link) => current === link;

  const menu = isAuthenticated
    ? (
      <UserMenu
        avatar={avatar}
        email={email}
        firstName={firstName}
        lastName={lastName}
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
          <svg className="AppHeader-logo">
            <use xlinkHref={iconLogo} />
          </svg>
        </Link>
      </div>

      <div className="AppHeader-item AppHeader-item--mobile">
        <a className="AppHeader-link" onClick={onSearch}>
          <svg className="AppHeader-iconMobileSearch">
            <use xlinkHref={iconSearch} />
          </svg>
        </a>
      </div>

      <div
        className={
          classnames(
            'AppHeader-item AppHeader-item--desktop',
            {
              'is-active': isLinkActive(routerPath, RECIPES) ||
                isLinkActive(routerPath, PRODUCTS)
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
            { 'is-active': isLinkActive(routerPath, `/${username}`) }
          )
        }
      >
        <Link to="/" className="AppHeader-link">
          <span className="AppHeader-link-text">FlavorPrint</span>
        </Link>
      </div>

      <div className="AppHeader-item AppHeader-item--desktop">
        <RecipeSearchField
          iconPosition="left"
          placeholder="Find a recipe"
        />
      </div>

      <div className="AppHeader-item AppHeader-item--desktop AppHeader-item--flex" />

      {menu}
    </div>
  );
};

const AppHeader = ({
  isAuthenticated,
  profile: {
    avatar,
    email,
    firstName,
    lastName,
    username,
  },
  routerPath,
  sticky,

  onLogInButtonClick,
  onLogOut,
  onSearch,
  onSidebarOpen,
  onSignUpButtonClick,
}) => {
  const isTransparent = includes([LOG_IN, HOME, SIGN_UP], routerPath);
  const isFilled = isAuthenticated || !isTransparent || sticky;

  return (
    <div className={classnames('AppHeader LayoutFlex-aside', { 'is-filled': isFilled })}>
      <div className="AppHeader-natural">
        <div className="AppHeader-container">
          <Menu
            avatar={avatar}
            email={email}
            firstName={firstName}
            isAuthenticated={isAuthenticated}
            lastName={lastName}
            routerPath={routerPath}
            username={username}
            onLogInButtonClick={onLogInButtonClick}
            onLogOut={onLogOut}
            onSearch={onSearch}
            onSidebarOpen={onSidebarOpen}
            onSignUpButtonClick={onSignUpButtonClick}
          />
        </div>
      </div>
      <div className="AppHeader-substitute" />
    </div>
  );
};

GuestMenu.propTypes = {
  onLogInButtonClick: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

Menu.propTypes = {
  avatar: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  lastName: PropTypes.string,
  routerPath: PropTypes.string,
  username: PropTypes.string,

  onLogInButtonClick: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
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
  sticky: PropTypes.bool,

  onLogInButtonClick: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSidebarOpen: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

export default AppHeader;
