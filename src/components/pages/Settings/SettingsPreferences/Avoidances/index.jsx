
import React, { PropTypes } from 'react';

import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import partial from 'lodash/partial';
import pick from 'lodash/pick';
import reject from 'lodash/reject';

import iconRoundedCross from 'assets/images/icons/icon-rounded-cross.svg';

import Icon from 'components/ui-elements/Icon';
import AvoidancesAutocomplete from 'components/blocks/AvoidancesAutocomplete';

const Avoidance = ({ text, onDeselect }) => (
  <div className="Settings-avoidance">
    <div
      className="Settings-avoidance-remove"
      onClick={onDeselect}
    >
      <Icon
        className="Settings-avoidance-icon"
        glyph={iconRoundedCross}
      />
    </div>
    <span className="Settings-avoidance-text">
      {text}
    </span>
  </div>
);

const Avoidances = ({ allergies, diet, inventories, items, value, onChange }) => {
  const handleChange = checked => item => {
    const pickedItem = pick(item, ['canonicalName', 'text']);
    const nextValue = checked
      ? concat(value, pickedItem)
      : reject(value, pickedItem);

    onChange(nextValue);
  };

  return (
    <div className="Settings-avoidances">
      <div className="Settings-avoidances-input">
        <AvoidancesAutocomplete
          allergies={allergies}
          defaultItems={items}
          diet={diet}
          maxCount={isEmpty(inventories) ? 3 : 7}
          selectedItems={value}
          onSelect={handleChange(true)}
        />
      </div>
      {!isEmpty(value) &&
        <div className="Settings-avoidances-list">
          {map(value, item =>
            <Avoidance
              key={item.text}
              text={item.text}
              onDeselect={partial(handleChange(false), item)}
            />
          )}
        </div>
      }
    </div>
  );
};

Avoidance.propTypes = {
  text: PropTypes.string.isRequired,
  onDeselect: PropTypes.func.isRequired,
};

Avoidances.propTypes = {
  allergies: PropTypes.array,
  diet: PropTypes.object,
  inventories: PropTypes.array,
  items: PropTypes.array.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default Avoidances;
