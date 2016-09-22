
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import Input from 'components/ui-elements/Input';

class RecipeYield extends Component {
  constructor(props) {
    super(props);
    this.handleChange = bind(this.handleChange, this);
  }

  handleChange(value) {
    const nextValue = Number(value.replace(/\D/g, '')) || null;
    this.props.onChange(nextValue);
  }

  render() {
    const { error, value, onSubmit } = this.props;

    return (
      <div className="RecipeBuilder-yield">
        <Input
          error={error}
          placeholder="#"
          value={value}
          onChange={this.handleChange}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

RecipeYield.propTypes = {
  error: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default RecipeYield;
