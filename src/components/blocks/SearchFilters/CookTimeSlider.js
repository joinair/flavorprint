
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import keys from 'lodash/keys';
import values from 'lodash/values';

import Slider from 'components/ui-elements/Slider';

import { splitTimeComponents } from 'helpers/time';

import { Group, Text } from './Block';

// 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 12 hours, any
const mapping = {
  [17 * 0]: 15,
  [17 * 1]: 30,
  [17 * 2]: 60,
  [17 * 3]: 120,
  [17 * 4]: 240,
  [17 * 5]: 720,
  [100]: 0,
};

const steps = keys(mapping);
const mappedValues = values(mapping);

const valueToStep = (value) => {
  const index = mappedValues.indexOf(value);
  if (index >= 0) {
    return Number(steps[index]);
  }
  return Number(steps[0]);
};

const valueToString = (value) => {
  if (value === 0) return 'Unlimited';

  const { minutes, hours } = splitTimeComponents(value * 60);
  const minutesStr = minutes > 0 ? ` ${minutes} mins` : '';
  const hoursStr = hours > 0 ? ` ${hours} hrs` : '';

  return `<${hoursStr}${minutesStr}`;
};

class CookTimeSlider extends Component {
  constructor(props, context) {
    super(props, context);

    this.onRelease = bind(this.onRelease, this);
    this.onChange = bind(this.onChange, this);
    this.state = { value: props.value };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.value !== newProps.value) {
      this.setState({ value: newProps.value });
    }
  }

  onRelease() {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(value);
  }

  onChange(perc) {
    const newValue = mapping[perc];
    this.setState({ value: newValue });
  }

  render() {
    const { value } = this.state;

    const sliderValue = valueToStep(value);

    return (
      <Group>
        <Slider
          value={sliderValue}
          onChange={this.onChange}
          onRelease={this.onRelease}
          descreteSteps={steps}
        />
        <Text>{valueToString(value)}</Text>
      </Group>
    );
  }
}

CookTimeSlider.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onRelease: PropTypes.func,
};

export default CookTimeSlider;
