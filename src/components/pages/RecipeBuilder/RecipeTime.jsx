
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import FormDropdown from 'components/pages/RecipeBuilder/Form/FormDropdown';
import { Dropdown, Option } from 'components/ui-elements/Dropdown';

const minutesIntoUnits = (value, units) => {
  switch (units) {
    case 'minutes': return value;
    case 'hours': return value / 60;
    default: return false;
  }
};

const unitsIntoMinutes = (value, units) => {
  switch (units) {
    case 'minutes': return value;
    case 'hours': return value * 60;
    default: return false;
  }
};

const valueIntoUnits = value => (
  value % 60 === 0 ? 'hours' : 'minutes'
);

class RecipeTime extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleUnitsChange = bind(this.handleUnitsChange, this);

    this.state = {
      units: valueIntoUnits(props.value),
    };
  }

  handleChange(event) {
    const { onChange } = this.props;
    const { units } = this.state;

    const value = Number(event.target.value.replace(/\D/g, ''));
    const nextValue = value ? unitsIntoMinutes(value, units) : null;

    if (value.toString().length < 5) {
      onChange(nextValue);
    }
  }

  handleUnitsChange(nextUnits) {
    const { value } = this.props;
    const { units } = this.state;

    const currentValue = minutesIntoUnits(value, units);
    const nextValue = unitsIntoMinutes(currentValue, nextUnits);

    this.setState({ units: nextUnits });
    this.props.onChange(nextValue);
  }

  focus() {
    this.refs.formDropdown.focus();
  }

  render() {
    const { error, label, value, onSubmit } = this.props;
    const { units } = this.state;

    return (
      <div className="RecipeBuilder-time">
        <div className="RecipeBuilder-time-container">
          <div className="RecipeBuilder-time-label RecipeBuilder-time-label--desktop">
            {label}:
          </div>
          <div className="RecipeBuilder-time-label RecipeBuilder-time-label--mobile">
            {label} time:
          </div>

          <FormDropdown
            isError={!!error}
            placeholder="0"
            ref="formDropdown"
            value={minutesIntoUnits(value, units)}
            onChange={this.handleChange}
            onSubmit={onSubmit}
          >
            <Dropdown value={units} onChange={this.handleUnitsChange}>
              <Option text="Minutes" value="minutes" />
              <Option text="Hours" value="hours" />
            </Dropdown>
          </FormDropdown>
        </div>
      </div>
    );
  }
}

RecipeTime.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default RecipeTime;
