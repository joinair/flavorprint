/* eslint react/no-did-update-set-state:0 */

import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import map from 'lodash/map';
import partial from 'lodash/partial';

import iconAdd from 'assets/images/icons/icon-mobile-add.svg';
import iconRemoveField from 'assets/images/icons/icon-remove-field.svg';

import Icon from 'components/ui-elements/Icon';
import Textarea from 'components/ui-elements/Textarea';

class RecipeInstructions extends Component {
  constructor(props) {
    super(props);

    this.state = { useFocus: true };

    this.focus = bind(this.focus, this);
    this.handleChange = bind(this.handleChange, this);
    this.handleSubmit = bind(this.handleSubmit, this);
  }

  componentDidUpdate(prevProps) {
    const prevLength = prevProps.instructions.length;
    const nextLength = this.props.instructions.length;

    if (prevLength === nextLength - 1) {
      if (this.state.useFocus) {
        this.refs[`step-${prevLength}`].focus();
      } else {
        this.setState({ useFocus: true });
      }
    }
  }

  focus() {
    const { addInstruction, instructions } = this.props;

    if (instructions.length === 0) {
      addInstruction();
    } else {
      this.refs['step-0'].focus();
    }
  }

  handleChange(index) {
    return value => {
      const { addInstruction, instructions, updateInstruction } = this.props;

      updateInstruction(index, value, () => {
        if (index + 1 === instructions.length) {
          this.setState({ useFocus: false });
          addInstruction();
        }
      });
    };
  }

  handleSubmit(index) {
    return () => {
      const { addInstruction, instructions } = this.props;

      if (index + 1 === instructions.length) {
        addInstruction();
      } else {
        this.refs[`step-${index + 1}`].focus();
      }
    };
  }

  render() {
    const {
      instructions,
      addInstruction, removeInstruction,
    } = this.props;

    const canRemoveItems = instructions.length > 1;
    const instructionList = map(instructions, ({ text }, index) =>
      <Textarea
        className="RecipeBuilder-instruction"
        icon={canRemoveItems ? iconRemoveField : null}
        iconStyle={{ height: 20, width: 20 }}
        placeholder="Add step (e.g. Mix the garlic, salt, and...)"
        key={index}
        ref={`step-${index}`}
        value={text}
        onChange={this.handleChange(index)}
        onIconClick={partial(removeInstruction, index)}
        onSubmit={this.handleSubmit(index)}
      />
    );

    return (
      <div className="RecipeBuilder-instructions">
        <div className="RecipeBuilder-instructionList">
          {instructionList}
        </div>
        <div
          className="RecipeBuilder-addButton"
          onClick={addInstruction}
        >
          <Icon
            className="RecipeBuilder-addButton-icon"
            glyph={iconAdd}
          />
          Add step
        </div>
      </div>
    );
  }
}

RecipeInstructions.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })).isRequired,

  addInstruction: PropTypes.func.isRequired,
  updateInstruction: PropTypes.func.isRequired,
  removeInstruction: PropTypes.func.isRequired,
};

export default RecipeInstructions;
