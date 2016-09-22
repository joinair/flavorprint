
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import concat from 'lodash/concat';
import find from 'lodash/find';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import pick from 'lodash/pick';
import reject from 'lodash/reject';
import size from 'lodash/size';
import some from 'lodash/some';
import unionBy from 'lodash/unionBy';

import AvoidancesAutocomplete from 'components/blocks/AvoidancesAutocomplete';
import OnboardingBubbleList from 'components/modals/Onboarding/OnboardingBubbleList';

import './styles.css';

const isItemFiltered = (item, filter) =>
  some(filter, (value, key) =>
    isArray(value)
      ? some(value, val => includes(item[key], val.canonicalName))
      : includes(item[key], get(value, 'canonicalName'))
  );

class OnboardingAvoidances extends Component {
  constructor(props) {
    super(props);

    this.handleAutocompleteChange = bind(this.handleAutocompleteChange, this);
    this.handleListChange = bind(this.handleListChange, this);

    this.state = {
      items: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      size(this.props.allergies) !== size(nextProps.allergies) ||
      this.props.diet !== nextProps.diet
    ) {
      const filter = {
        allergies: nextProps.allergies,
        diets: nextProps.diet,
      };

      const nextValue = reject(nextProps.value, valueItem => {
        const matcher = pick(valueItem, 'canonicalName');
        const item = find(this.getItems(), matcher);

        return isItemFiltered(item, filter);
      });

      this.props.onChange(nextValue);
    }
  }

  getItems() {
    return unionBy(
      this.props.preferences.dislikedProducts,
      this.state.items,
      this.props.value,
      'canonicalName'
    );
  }

  prepareItems() {
    const filter = {
      allergies: this.props.allergies,
      diets: this.props.diet,
    };

    return map(this.getItems(), item => ({
      text: item.text,
      value: item.canonicalName,
      disabled: isItemFiltered(item, filter),
    }));
  }

  prepareValue() {
    return !isEmpty(this.props.value)
      ? map(this.props.value, 'canonicalName')
      : null;
  }

  handleListChange(key, checked) {
    const item = find(this.getItems(), { canonicalName: key });
    const pickedItem = pick(item, 'canonicalName', 'text');

    const value = checked
      ? concat(this.props.value, pickedItem)
      : reject(this.props.value, pickedItem);

    this.props.onChange(value);
  }

  handleAutocompleteChange(item) {
    const matcher = pick(item, 'canonicalName');
    const hasItemInItems = some(this.getItems(), matcher);
    const hasItemInValue = some(this.props.value, matcher);

    if (!hasItemInItems || !hasItemInValue) {
      if (!hasItemInItems) {
        this.setState({
          items: concat(this.state.items, item),
        });
      }

      const pickedItem = pick(item, 'canonicalName', 'text');

      if (!hasItemInValue) {
        this.props.onChange(
          concat(this.props.value, pickedItem)
        );
      }
    }
  }

  render() {
    const { allergies, diet, preferences, value } = this.props;

    return (
      <div className="OnboardingAvoidances">
        <div className="OnboardingAvoidances-autocomplete">
          <AvoidancesAutocomplete
            allergies={allergies}
            context="Onboarding"
            defaultItems={preferences.dislikedProducts}
            diet={diet}
            maxCount={7}
            selectedItems={value}
            onSelect={this.handleAutocompleteChange}
          />
        </div>

        <div className="OnboardingAvoidances-list">
          <OnboardingBubbleList
            items={this.prepareItems()}
            itemsStyle="blocked"
            value={this.prepareValue()}
            onChange={this.handleListChange}
          />
        </div>
      </div>
    );
  }
}

OnboardingAvoidances.propTypes = {
  allergies: PropTypes.array,
  diet: PropTypes.object,
  preferences: PropTypes.shape({
    dislikedProducts: PropTypes.array,
  }).isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default OnboardingAvoidances;
