
import React from 'react';

import JustForYouTabs from 'components/blocks/JustForYouTabs';

import Feed from './Feed';

const Products = () => (
  <div>
    <JustForYouTabs />
    <h1 className="RecipePage-title">Your product recommendations for today.</h1>
    <h5 className="RecipePage-subtitle">Powered by FlavorPrint</h5>
    <div className="AppContainer AppContainer-mainSection">
      <Feed />
    </div>
  </div>
);

export default Products;
