
import React from 'react';
import { Link } from 'react-router';

import { TERMS_OF_SERVICE } from 'constants/Routes';

const AuthenticationFormTerms = () => (
  <div className="AuthenticationForm-terms">
    <span>
      By creating an account you agree to our{' '}
      <Link
        className="AuthenticationForm-terms-link"
        to={TERMS_OF_SERVICE}
      >
        Terms &amp; Conditions
      </Link>
    </span>
  </div>
);

export default AuthenticationFormTerms;
