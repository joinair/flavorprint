
import React from 'react';

import JustForYouTabs from 'components/blocks/JustForYouTabs';

import Feed from './Feed';

import './styles.css';

const Recipes = () => (
  <div className="RecipesPage">
    <JustForYouTabs />
    <h1 className="RecipePage-title">Your recipe recommendations for today.</h1>
    <h5 className="RecipePage-subtitle">Powered by your FlavorPrint profile</h5>
    <div className="AppContainer AppContainer-mainSection">
      <Feed />
    </div>
  </div>
);

export default Recipes;
