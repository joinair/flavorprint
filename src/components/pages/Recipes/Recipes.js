
import React from 'react';

import JustForYouTabs from 'components/blocks/JustForYouTabs';

import Feed from './Feed';

const Recipes = () => (
  <div>
    <JustForYouTabs />
    <div className="AppContainer AppContainer-mainSection">
      <Feed />
    </div>
  </div>
);

export default Recipes;
