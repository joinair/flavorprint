
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { TERMS_OF_SERVICE, PRIVACY_POLICY } from 'constants/Routes';

import iconTwitter from 'assets/images/icons/icon-twitter.svg';
import iconFacebook from 'assets/images/icons/icon-facebook.svg';
import './styles.css';

const TextLink = ({ to, href, children }) =>
  <div className="AppFooter-item">
    <Link
      to={to}
      href={href}
      className="AppFooter-link"
    >
      {children}
    </Link>
  </div>;

const IconLink = ({ to, children }) =>
  <div className="AppFooter-iconsList-item">
     <a
       href={to}
       target="_blank"
       rel="noopener noreferrer"
       className="AppFooter-link AppFooter-link--icon"
     >
      {children}
     </a>
   </div>;

const AppFooter = () =>
  <div className="AppFooter LayoutFlex-aside">
    <div className="AppFooter-container">
      <TextLink to={PRIVACY_POLICY}>Privacy</TextLink>
      <TextLink to={TERMS_OF_SERVICE}>Terms</TextLink>
      <TextLink href="mailto:contact@vivanda.com">Contact us</TextLink>
      <div className="AppFooter-item">© 2017 Vivanda, Inc.</div>

      <div className="AppFooter-item AppFooter-iconsList">
        <IconLink to="https://twitter.com/Vivanda_Inc">
          <svg className="AppFooter-link-icon AppFooter-link-icon--tw">
            <use xlinkHref={iconTwitter} />
          </svg>
        </IconLink>

        <IconLink to="https://www.facebook.com/FlavorPrint-1414754578829866">
          <svg className="AppFooter-link-icon AppFooter-link-icon--fb">
            <use xlinkHref={iconFacebook} />
          </svg>
        </IconLink>
      </div>
    </div>
  </div>;

TextLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
};

IconLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default AppFooter;
