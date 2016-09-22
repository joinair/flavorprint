
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import isEqual from 'lodash/isEqual';

import Button from 'components/ui-elements/Button';
import ModalHeader from 'components/tmp/Modal/ModalHeader';
import SearchFiltersBlock from 'components/blocks/SearchFilters';

import './styles.css';

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { filters: props.filters };
    this.onFiltersApply = bind(this.onFiltersApply, this);
    this.saveFilters = bind(this.saveFilters, this);
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.filters, this.props.filters)) {
      this.setState(newProps.filters);
    }
  }

  onFiltersApply(filters) {
    this.setState({ filters });
  }

  saveFilters() {
    const { onFiltersApply } = this.props;
    onFiltersApply(this.state.filters);
  }

  render() {
    const { onClose } = this.props;

    const resetButton = (
      <Button
        outline
        onClick={this.props.onFiltersReset}
      >
        Reset
      </Button>
    );

    const cancelButton = (
      <Button
        outline
        onClick={onClose}
      >
        Cancel
      </Button>
    );

    return (
      <div className="FiltersModal">
        <div className="FiltersModal-body">
          <ModalHeader
            afterTitle={cancelButton}
            beforeTitle={resetButton}
            closeButton={false}
            title="Search"
          />
          <SearchFiltersBlock
            allergies={this.props.prefCategories.allergies}
            diets={this.props.prefCategories.diets}
            mealTypes={this.props.prefCategories.mealTypes}
            onFiltersApply={this.onFiltersApply}
            onFiltersReset={this.props.onFiltersReset}
            filters={this.state.filters}
            products={this.props.products}
            facetsHits={this.props.facetsHits}
          />
        </div>

        <div className="FiltersModal-footer">
          <Button
            className="Button--broccoliFill Button--l FiltersModal-applyFiltersButton"
            onClick={this.saveFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }
}

SearchFilters.propTypes = {
  onClose: PropTypes.func.isRequired,
  prefCategories: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  onFiltersApply: PropTypes.func.isRequired,
  onFiltersReset: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  facetsHits: PropTypes.object.isRequired,
};

export default SearchFilters;
