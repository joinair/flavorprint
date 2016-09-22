
import React, { PropTypes } from 'react';

import partial from 'lodash/partial';

import ShoppingListFilters from 'constants/ShoppingListFilters';

import iconSettings from 'assets/images/icons/icon-mobile-settings.svg';

import Checkbox from 'components/ui-elements/Checkbox';
import Icon from 'components/ui-elements/Icon';
import { Popup, PopupContent, PopupTrigger } from 'components/ui-elements/Popup';

const SettingsPanel = ({ sortBy, onFilterChange, onItemsClear }) => {
  const sortBySetting = (
    <div className="ShoppingList-settingsPanelDropdown-sortBy">
      <div className="ShoppingList-settingsPanelDropdown-sortBy-item">Sort by: </div>

      <div className="ShoppingList-settingsPanelDropdown-sortBy-item">
        <Checkbox
          label="Recipe"
          type="radio"
          checked={sortBy === ShoppingListFilters.RECIPE}
          onChange={partial(onFilterChange, ShoppingListFilters.RECIPE)}
        />
      </div>

      <div className="ShoppingList-settingsPanelDropdown-sortBy-item">
        <Checkbox
          label="Aisle"
          type="radio"
          checked={sortBy === ShoppingListFilters.AISLE}
          onChange={partial(onFilterChange, ShoppingListFilters.AISLE)}
        />
      </div>
    </div>
  );

  return (
    <div className="ShoppingList-settingsPanelDropdown-container">
      <div className="ShoppingList-settingsPanelDropdown-column">
        {sortBySetting}
      </div>

      <div className="ShoppingList-settingsPanelDropdown-column">
        <a
          className="ShoppingList-settingsPanelDropdown-clearBtn"
          onClick={onItemsClear}
        >
          Clear entire list
        </a>
      </div>
    </div>
  );
};

const Settings = ({ sortBy, onFilterChange, onItemsClear }) =>
  <Popup
    className="ShoppingList-toggleSettingsPanel"
    closeOnContentClick={false}
  >
    <PopupTrigger className="ShoppingList-addSection-icon">
      <Icon className="ShoppingList-settingsButton" glyph={iconSettings} />
    </PopupTrigger>

    <PopupContent className="ShoppingList-settingsPanelDropdown">
      <SettingsPanel
        sortBy={sortBy}
        onFilterChange={onFilterChange}
        onItemsClear={onItemsClear}
      />
    </PopupContent>
  </Popup>;

SettingsPanel.propTypes = {
  sortBy: PropTypes.string.isRequired,

  onFilterChange: PropTypes.func.isRequired,
  onItemsClear: PropTypes.func.isRequired,
};

Settings.propTypes = {
  sortBy: PropTypes.string.isRequired,

  onFilterChange: PropTypes.func.isRequired,
  onItemsClear: PropTypes.func.isRequired,
};

export default Settings;
