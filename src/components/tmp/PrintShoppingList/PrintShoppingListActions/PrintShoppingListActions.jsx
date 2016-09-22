
import React, { PropTypes } from 'react';

import partial from 'lodash/partial';

import ShoppingListFilters from 'constants/ShoppingListFilters';

const PrintOption = ({
  label, firstOption, secondOption,
  value, onChange,
}) =>
  <div className="PrintOption">
    <div className="PrintOption-label">{label}</div>
    <div className="PrintOption-toggle">
      <label className="PrintOption-toggle-label">
        <div className="PrintOption-toggle-name">{firstOption}</div>
        <div className="PrintOption-toggle-switch">
          <input
            className="PrintOption-toggle-field"
            type="checkbox"
            checked={!value}
            onChange={onChange}
          />

          <div className="PrintOption-toggle-outerDecorContainer">
            <div className="PrintOption-toggle-innerDecorContainer" />
          </div>
        </div>

        <div className="PrintOption-toggle-name">{secondOption}</div>
      </label>
  </div>
</div>;

const PrintShoppingListActions = ({
  sortBy,
  isExtraLinesVisible,
  isFontSizeLarge,
  isKeyVisible,
  onFilterChange,
  onShowKey,
  onHideKey,
  onShowExtraLines,
  onHideExtraLines,
  onFontSizeLarge,
  onFontSizeSmall,
}) => {
  const isSortedByRecipe = sortBy === ShoppingListFilters.RECIPE;

  return (
    <div className="PrintHeader-printActions">
      <PrintOption
        label="Sort by"
        firstOption="Recipe"
        secondOption="Category"
        value={isSortedByRecipe}
        onChange={
          isSortedByRecipe
            ? partial(onFilterChange, ShoppingListFilters.AISLE)
            : partial(onFilterChange, ShoppingListFilters.RECIPE)
        }
      />

      <PrintOption
        label="Font size"
        firstOption="Large"
        secondOption="Small"
        value={isFontSizeLarge}
        onChange={
          isFontSizeLarge
            ? onFontSizeSmall
            : onFontSizeLarge
        }
      />

      <PrintOption
        label="Show recipes key"
        firstOption="Yes"
        secondOption="No"
        value={isKeyVisible}
        onChange={
        isKeyVisible
            ? onHideKey
            : onShowKey
        }
      />

      <PrintOption
        label="Additional lines"
        firstOption="Yes"
        secondOption="No"
        value={isExtraLinesVisible}
        onChange={
          isExtraLinesVisible
            ? onHideExtraLines
            : onShowExtraLines
        }
      />
    </div>
  );
};

PrintOption.propTypes = {
  label: PropTypes.string.isRequired,
  firstOption: PropTypes.string.isRequired,
  secondOption: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

PrintShoppingListActions.propTypes = {
  sortBy: PropTypes.string.isRequired,
  isExtraLinesVisible: PropTypes.bool.isRequired,
  isFontSizeLarge: PropTypes.bool.isRequired,
  isKeyVisible: PropTypes.bool.isRequired,

  onFilterChange: PropTypes.func.isRequired,
  onFontSizeSmall: PropTypes.func.isRequired,
  onFontSizeLarge: PropTypes.func.isRequired,
  onShowExtraLines: PropTypes.func.isRequired,
  onHideExtraLines: PropTypes.func.isRequired,
  onShowKey: PropTypes.func.isRequired,
  onHideKey: PropTypes.func.isRequired,
};

export default PrintShoppingListActions;
