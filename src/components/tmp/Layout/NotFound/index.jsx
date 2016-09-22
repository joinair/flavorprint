
import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import { RECIPE_FEED } from 'constants/Routes';

import './styles.css';

import BodyClassName from 'components/ui-elements/BodyClassName';

const NotFound = () => {
  const homepage = (
    <Link to={{ pathname: RECIPE_FEED }}>
      homepage
    </Link>
  );
  const contactUs = (
    <a href="mailto:support@whisk.com">
      contact us
    </a>
  );

  return (
    <div className="NotFound">
      <Helmet title="Not found - Whisk" />
      <BodyClassName className="Body--whiteBackground" />

      <div className="NotFound-code">
        <img
          alt="404 Not found"
          src="/assets/images/static-images/404.png"
          srcSet="/assets/images/static-images/404@2x.png 2x"
          title="404 Not found"
        />
      </div>

      <div className="NotFound-message">
        This page doesn't exist.<br />
        Maybe you would like to go to {homepage} or {contactUs}?
      </div>
    </div>
  );
};

export default NotFound;
