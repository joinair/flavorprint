
import React, { PropTypes } from 'react';

import { RECIPES, PRODUCTS } from 'constants/Routes';

import './styles.css';

import { Tab, Tabs, TabList } from 'components/ui-elements/Tabs';

const JustForYouTabs = ({ activePath, onTabSelect }) => (
  <div className="JustForYouTabs">
    <div className="JustForYouTabs-cover">
      <Tabs className="JustForYouTabs-tabs" onSelect={onTabSelect}>
        <TabList className="JustForYouTabs-tabList">
          <Tab
            className="JustForYouTabs-tab"
            name={RECIPES}
            selected={activePath === RECIPES}
          >
            Recipes
          </Tab>
          <Tab
            className="JustForYouTabs-tab"
            name={PRODUCTS}
            selected={activePath === PRODUCTS}
          >
            Products
          </Tab>
        </TabList>
      </Tabs>
    </div>
  </div>
);

JustForYouTabs.propTypes = {
  activePath: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
};

export default JustForYouTabs;
