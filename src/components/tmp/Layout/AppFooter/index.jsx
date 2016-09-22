
import React, { PropTypes } from 'react';

import iconTwitter from 'assets/images/icons/icon-twitter.svg';
import iconGPlus from 'assets/images/icons/icon-gplus.svg';
import iconFacebook from 'assets/images/icons/icon-facebook.svg';
import './styles.css';

const staticPage = path => `https://about.whisk.com${path}`;

const TextLink = ({ to, children }) =>
  <div className="AppFooter-item">
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="AppFooter-link"
    >
      {children}
    </a>
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
      <TextLink to="http://whisk.uservoice.com/">Help & Support</TextLink>
      <TextLink to={staticPage('/')}>About Us</TextLink>
      <TextLink to={staticPage('/business')}>Whisk for Business</TextLink>
      <TextLink to={staticPage('/privacy-policy')}>Privacy</TextLink>
        <TextLink to={staticPage('/terms')}>Terms</TextLink>
        <div className="AppFooter-item">© 2012 – 2016 Whisk</div>

        <div className="AppFooter-item AppFooter-iconsList">
          <IconLink to="https://twitter.com/WhiskTeam">
            <svg className="AppFooter-link-icon AppFooter-link-icon--tw">
              <use xlinkHref={iconTwitter} />
            </svg>
          </IconLink>

          <IconLink to="https://plus.google.com/114770266876345286879">
            <svg className="AppFooter-link-icon AppFooter-link-icon--gplus">
              <use xlinkHref={iconGPlus} />
            </svg>
          </IconLink>

          <IconLink to="https://www.facebook.com/Whiskapps">
            <svg className="AppFooter-link-icon AppFooter-link-icon--fb">
              <use xlinkHref={iconFacebook} />
            </svg>
          </IconLink>
        </div>
    </div>
  </div>;

TextLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

IconLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default AppFooter;
