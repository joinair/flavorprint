
import React, { Component, PropTypes } from 'react';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import isEqual from 'lodash/isEqual';
import partial from 'lodash/partial';

import Toggler from './Toggler';
import TagsPicker from './TagsPicker';
import CookTimeSlider from './CookTimeSlider';
import CheckboxesFilter from './CheckboxesFilter';
import { Block } from './Block';
import Description from './Description';

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.filtersCommit = bind(this.filtersCommit, this);
  }

  componentWillMount() {
    this.setState(this.props.filters);
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.filters, this.props.filters)) {
      this.setState(newProps.filters);
    }
  }

  filterValue(filter, fallback = null) {
    const value = this.state[filter];
    return typeof(value) === 'undefined' ? fallback : value;
  }

  filterOnChange(filter, commit = true) {
    return (value) => {
      const { onFiltersApply } = this.props;
      const newFilters = assign({}, this.props.filters, { [filter]: value });
      this.setState(newFilters);
      if (commit) {
        onFiltersApply(newFilters);
      }
    };
  }

  filtersCommit() {
    this.props.onFiltersApply(this.state);
  }

  render() {
    const {
      allergies,
      diets,
      mealTypes,
      displayOptions,
      onIngredientsChoose,
    } = this.props;

    const description = <Description />;

    const dietsCheckboxes = (
      <CheckboxesFilter
        onChange={this.filterOnChange('diets')}
        value={this.filterValue('diets', [])}
        options={diets}
        facetsHits={this.props.facetsHits.diets}
        singleColumn={displayOptions.dietsSingleColumn}
      />
    );

    const allergiesCheckboxes = (
      <CheckboxesFilter
        onChange={this.filterOnChange('allergies')}
        value={this.filterValue('allergies', [])}
        options={allergies}
        facetsHits={this.props.facetsHits.allergies}
      />
    );

    const mealTypesCheckboxes = (
      <CheckboxesFilter
        onChange={this.filterOnChange('mealTypes')}
        value={this.filterValue('mealTypes', [])}
        options={mealTypes}
        facetsHits={this.props.facetsHits.mealTypes}
      />
    );

    return (
      <Block>
        {description}

        <Toggler label="With Ingredients">
          <TagsPicker
            style="broccoli"
            value={this.filterValue('withIngredients', [])}
            onChange={this.filterOnChange('withIngredients')}
            onIngredientsChoose={partial(onIngredientsChoose, this.state, 'withIngredients')}
            tags={this.props.products}
          />
        </Toggler>
        <Toggler label="Without Ingredients">
          <TagsPicker
            style="paprika"
            value={this.filterValue('withoutIngredients', [])}
            onChange={this.filterOnChange('withoutIngredients')}
            onIngredientsChoose={partial(onIngredientsChoose, this.state, 'withoutIngredients')}
            tags={this.props.products}
          />
        </Toggler>
        <Toggler label="Diets">
          {dietsCheckboxes}
        </Toggler>
        <Toggler label="Allergies">
          {allergiesCheckboxes}
        </Toggler>
        <Toggler label="Time (prep + cook)">
          <CookTimeSlider
            value={this.filterValue('time', 0)}
            onChange={this.filterOnChange('time')}
          />
        </Toggler>
        <Toggler label="Courses">
          {mealTypesCheckboxes}
        </Toggler>
      </Block>
    );
  }
}

SearchFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersApply: PropTypes.func.isRequired,
  onIngredientsChoose: PropTypes.func.isRequired,
  facetsHits: PropTypes.object.isRequired,
  allergies: PropTypes.array,
  diets: PropTypes.array,
  products: PropTypes.object,
  mealTypes: PropTypes.array,
  displayOptions: PropTypes.shape({
    dietsSingleColumn: PropTypes.bool,
  }),
};

SearchFilters.defaultProps = {
  allergies: [],
  diets: [],
  mealTypes: [],
  displayOptions: {},
  onIngredientsChoose: () => {},
};

export default SearchFilters;
