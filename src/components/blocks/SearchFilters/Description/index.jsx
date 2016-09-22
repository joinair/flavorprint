
import React from 'react';

import { Link } from 'react-router';

import { PREFERENCES } from 'constants/Routes';

const Description = () => (
  <div className="SearchFilters-description">
    Your{' '}
    <Link to={{ pathname: PREFERENCES }}>
      preferences
    </Link>{' '}
    were applied to these filters.
  </div>
);

export default Description;
