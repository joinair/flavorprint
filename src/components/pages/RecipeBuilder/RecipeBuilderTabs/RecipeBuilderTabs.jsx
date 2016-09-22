
import React, { PropTypes } from 'react';

import { RECIPES_NEW, RECIPES_IMPORT } from 'constants/Routes';

import { TabList, Tabs, Tab } from 'components/ui-elements/Tabs';

const RecipeBuilderTabs = props => {
  const { children, tabInfo, navigateToTab } = props;
  const { page } = tabInfo;

  const onSelect = navigateToTab;

  return (
    <div>
      <Tabs
        onSelect={onSelect}
        className="RecipeBuilder-tabs"
      >
        <TabList className="RecipeBuilder-tabs-list">
          <Tab
            className="RecipeBuilder-tabs-list-tab"
            name={RECIPES_NEW}
            selected={page === RECIPES_NEW}
          >
            Create a recipe
          </Tab>
          <Tab
            className="RecipeBuilder-tabs-list-tab"
            name={RECIPES_IMPORT}
            selected={page === RECIPES_IMPORT}
          >
            Import URL
          </Tab>
        </TabList>
      </Tabs>

      {children}
    </div>
  );
};

RecipeBuilderTabs.propTypes = {
  tabInfo: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  navigateToTab: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default RecipeBuilderTabs;
