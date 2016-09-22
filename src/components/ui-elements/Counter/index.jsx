
import React, { PropTypes } from 'react';

import add from 'lodash/add';
import clamp from 'lodash/clamp';
import classnames from 'classnames';
import partial from 'lodash/partial';
import subtract from 'lodash/subtract';

import iconMinus from 'assets/images/icons/icon-minus.svg';
import iconPlus from 'assets/images/icons/icon-plus.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';

const isMaximum = (value, max, step) => add(value, step) > max;
const isMinimum = (value, min, step) => subtract(value, step) < min;

const getStepValue = (event, step, stepModifier) =>
  event.shiftKey ? (step * stepModifier) : step;

const Counter = ({
  value, min, max, step, stepModifier, className,
  onChange,
}) => {
  const handleChange = (operation, event) => {
    const nextStep = getStepValue(event, step, stepModifier);
    const nextValue = clamp(operation(value, nextStep), min, max);

    if (value !== nextValue) {
      onChange(nextValue);
    }
  };

  return (
    <div className={classnames('Counter', className)}>
      <div
        className={
          classnames(
            'Counter-button',
            'Counter-button--decrement',
            { 'is-disabled': isMinimum(value, min, step) }
          )
        }
        onClick={partial(handleChange, subtract)}
      >
        <Icon
          glyph={iconMinus}
          style={{ height: 2, width: 12 }}
        />
      </div>

      <div className="Counter-value">
        {value}
      </div>

      <div
        className={
          classnames(
            'Counter-button',
            'Counter-button--increment',
            { 'is-disabled': isMaximum(value, max, step) }
          )
        }
        onClick={partial(handleChange, add)}
      >
        <Icon
          glyph={iconPlus}
          style={{ height: 12, width: 12 }}
        />
      </div>
    </div>
  );
};

Counter.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  stepModifier: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

Counter.defaultProps = {
  className: '',
  max: 99,
  min: 0,
  step: 1,
  stepModifier: 10,
  value: 0,
  onChange: null,
};

export default Counter;
