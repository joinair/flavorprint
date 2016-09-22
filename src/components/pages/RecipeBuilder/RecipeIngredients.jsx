/* eslint react/no-did-update-set-state:0 */

import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import map from 'lodash/map';
import partial from 'lodash/partial';

import iconAdd from 'assets/images/icons/icon-mobile-add.svg';
import iconRemoveField from 'assets/images/icons/icon-remove-field.svg';

import Icon from 'components/ui-elements/Icon';
import Input from 'components/ui-elements/Input';

class RecipeIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = { useFocus: true };

    this.focus = bind(this.focus, this);
    this.handleChange = bind(this.handleChange, this);
    this.handleSubmit = bind(this.handleSubmit, this);
  }

  componentDidUpdate(prevProps) {
    const prevLength = prevProps.ingredients.length;
    const nextLength = this.props.ingredients.length;

    if (prevLength === nextLength - 1) {
      if (this.state.useFocus) {
        this.refs[`step-${prevLength}`].focus();
      } else {
        this.setState({ useFocus: true });
      }
    }
  }

  focus() {
    const { addIngredient, ingredients } = this.props;

    if (ingredients.length === 0) {
      addIngredient();
    } else {
      this.refs['step-0'].focus();
    }
  }

  handleChange(index) {
    return value => {
      const { addIngredient, ingredients, updateIngredient } = this.props;

      updateIngredient(index, value, () => {
        if (index + 1 === ingredients.length) {
          this.setState({ useFocus: false });
          addIngredient();
        }
      });
    };
  }

  handleSubmit(index) {
    return () => {
      const { addIngredient, ingredients } = this.props;

      if (index + 1 === ingredients.length) {
        addIngredient();
      } else {
        this.refs[`step-${index + 1}`].focus();
      }
    };
  }

  render() {
    const {
      error, ingredients,
      addIngredient, removeIngredient,
    } = this.props;

    const canRemoveItems = ingredients.length > 1;
    const ingredientList = map(ingredients, ({ text }, index) =>
      <Input
        className="RecipeBuilder-ingredient"
        error={index === 0 ? error : null}
        icon={canRemoveItems ? iconRemoveField : null}
        iconStyle={{ height: 20, width: 20 }}
        placeholder="Add ingredient (e.g. 1 tbsp garlic, finely chopped)"
        key={index}
        ref={`step-${index}`}
        value={text}
        onChange={this.handleChange(index)}
        onIconClick={partial(removeIngredient, index)}
        onSubmit={this.handleSubmit(index)}
      />
    );

    return (
      <div className="RecipeBuilder-ingredients">
        <div className="RecipeBuilder-ingredientList">
          {ingredientList}
        </div>
        <div
          className="RecipeBuilder-addButton"
          onClick={addIngredient}
        >
          <Icon
            className="RecipeBuilder-addButton-icon"
            glyph={iconAdd}
          />
          Add ingredient
        </div>
      </div>
    );
  }
}

RecipeIngredients.propTypes = {
  error: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })).isRequired,

  addIngredient: PropTypes.func.isRequired,
  updateIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

export default RecipeIngredients;
