
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { RECIPES, FLAVORPRINT } from 'constants/Routes';

import iconChefHat from 'assets/images/icons/icon-mobile-chef-hat.svg';
import iconHeart from 'assets/images/icons/icon-mobile-heart.svg';
import iconLogout from 'assets/images/icons/icon-mobile-logout.svg';

import './styles.css';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import Sidebar from 'components/ui-elements/Sidebar';
import Mark from 'components/blocks/Mark';

const UserName = ({ user }) =>
  user.firstName
    ? <span>{user.firstName}</span>
    : <span>{user.email}</span>;

const UserMenu = ({
  user,
  onLogInButtonClick, onSidebarClose, onSignUpButtonClick,
}) => {
  const handleAuthClick = action => () => {
    action();
    onSidebarClose();
  };

  const mark = (
    <div className="MobileMenu-mark">
      <Mark width={120} mark={user.mark} />
    </div>
  );

  return user.isAuthenticated
    ? (
      <div className="MobileMenu-user">
        {mark}
        <div className="MobileMenu-user-info">
          <UserName user={user} />
        </div>
      </div>
    ) : (
      <div className="MobileMenu-user">
        {mark}
        <div className="MobileMenu-user-info">
          <div className="MobileMenu-user-authControls">
            <Button
              className="MobileMenu-user-authControls-item"
              outline
              onClick={handleAuthClick(onSignUpButtonClick)}
            >
              Sign Up
            </Button>

            <Button
              className="MobileMenu-user-authControls-item"
              outline
              onClick={handleAuthClick(onLogInButtonClick)}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    );
};

const LogOutMenuItem = ({ isAuthenticated, onLogOut }) => (
  isAuthenticated
    ? (
      <div className="MobileMenu-menu-item">
        <a
          onClick={onLogOut}
          className="MobileMenu-menu-item-link"
        >
          <div className="MobileMenu-menu-item-iconContainer">
            <Icon
              className="MobileMenu-menu-item-icon MobileMenu-menu-item-icon--logout"
              glyph={iconLogout}
            />
          </div>

          <div className="MobileMenu-menu-item-text">
            Log out
          </div>
        </a>
      </div>
    ) : null
);

const SidebarMenu = ({
  isSidebarOpened,
  user,

  onLogInButtonClick,
  onLogOut,
  onSidebarClose,
  onSignUpButtonClick,
}) => (
  <Sidebar
    className="MobileMenu"
    isOpen={isSidebarOpened}
    onSidebarClose={onSidebarClose}
    left
  >
    <div>
      <UserMenu
        user={user}
        onLogInButtonClick={onLogInButtonClick}
        onSidebarClose={onSidebarClose}
        onSignUpButtonClick={onSignUpButtonClick}
      />

      <div className="MobileMenu-menu">
        <div className="MobileMenu-menu-item">
          <Link to={RECIPES} className="MobileMenu-menu-item-link">
            <div className="MobileMenu-menu-item-iconContainer">
              <Icon
                className="MobileMenu-menu-item-icon MobileMenu-menu-item-icon--chefHat"
                glyph={iconChefHat}
              />
            </div>
            <div className="MobileMenu-menu-item-text">
              Just for you
            </div>
          </Link>
        </div>

        <div className="MobileMenu-menu-item">
          <Link to={FLAVORPRINT} className="MobileMenu-menu-item-link">
            <div className="MobileMenu-menu-item-iconContainer">
              <Icon
                className="MobileMenu-menu-item-icon MobileMenu-menu-item-icon--heart"
                glyph={iconHeart}
              />
            </div>
            <div className="MobileMenu-menu-item-text">
              FlavorPrint
            </div>
          </Link>
        </div>

        <LogOutMenuItem
          isAuthenticated={user.isAuthenticated}
          onLogOut={onLogOut}
        />
      </div>
    </div>
  </Sidebar>
);

UserName.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
  }).isRequired,
};

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  onLogInButtonClick: PropTypes.func.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

LogOutMenuItem.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogOut: PropTypes.func.isRequired,
};

SidebarMenu.propTypes = {
  isSidebarOpened: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    LastName: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  }).isRequired,

  onLogInButtonClick: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
  onSignUpButtonClick: PropTypes.func.isRequired,
};

export default SidebarMenu;
