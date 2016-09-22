/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import capitalize from 'lodash/capitalize';
import debounce from 'lodash/debounce';
import bind from 'lodash/bind';

import Preloader from 'components/ui-elements/Preloader';
import Button from 'components/ui-elements/Button';
import SearchFilters from 'components/blocks/SearchFilters';
import AuthForOnboarding from 'components/banners/AuthForOnboarding';
import Recipes from '../Recipes';
import SearchBox from '../SearchBox';

import '../styles.css';
import filtersIcon from 'assets/images/icons/icon-filters.svg';

import { numberText } from './helpers';

const placeholderText = (
  <div>
    Sorry, we couldn't find any recipes.
    <br />
    Remove some filters or search for something else.
  </div>
);

const labelText = (numberOfResults, term) =>
  numberOfResults ? numberText(numberOfResults, term) : placeholderText;

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.onFiltersApply = bind(this.onFiltersApply, this);
    this.onFiltersApply = debounce(this.onFiltersApply, 1000);
  }

  onFiltersApply(filters) {
    this.props.onFiltersApply(filters);
  }

  renderPreloader() {
    return (
      <div className="SearchResults-layout-preloader">
        <div>
          <Preloader className="SearchResults-layout-spinner" />
          <div>Finding recipes...</div>
        </div>
      </div>
    );
  }

  renderMobile() {
    const { isFetching, term, onTermSearch, numberOfResults } = this.props;

    const text = numberText(numberOfResults, term);

    const filtersButton = (
      <Button
        outline
        icon={filtersIcon}
        iconStyle={{ width: 16, height: 16 }}
        onClick={this.props.onFiltersOpen}
      >
        Filters
      </Button>
    );

    const mobileLabelResults = (
      <div className="SearchResults-label SearchResults-label--mobile">
        <div className="SearchResults-label-searchField">
          <SearchBox
            onSearch={onTermSearch}
            defaultValue={term}
          />
        </div>
        <div className="SearchResults-widget">
          <div className="SearchResults-widget-text">
            {isFetching || text}
          </div>

          {filtersButton}
        </div>
      </div>
    );

    return mobileLabelResults;
  }

  renderDesktop(text) {
    const { numberOfResults } = this.props;

    return numberOfResults
      ? (
        <div className="SearchResults-label SearchResults-label--desktop">
          {text}
        </div>
      ) : (
        <div className="SearchResults-placeholderContainer">
          <div className="SearchResults-placeholder SearchResults-placeholder--desktop">
            {text}
          </div>
        </div>
      );
  }

  render() {
    const { isFetching, numberOfResults, term } = this.props;

    const meta = <Helmet title={`${capitalize(term)} recipes - Whisk`} />;

    const text = labelText(numberOfResults, term);

    const sidebar = (
      <div className="SearchResults-sidebar">
        <div className="SearchResults-sidebar-header">
          <h2 className="SearchResults-sidebar-header-text">Filters</h2>
          <Button
            outline
            size="small"
            onClick={this.props.onFiltersReset}
          >
            Reset
          </Button>
        </div>
        <SearchFilters
          allergies={this.props.prefCategories.allergies}
          diets={this.props.prefCategories.diets}
          mealTypes={this.props.prefCategories.mealTypes}
          onFiltersApply={this.onFiltersApply}
          onFiltersReset={this.props.onFiltersReset}
          filters={this.props.filters}
          products={this.props.products}
          facetsHits={this.props.facetsHits}
          displayOptions={{
            dietsSingleColumn: true,
          }}
        />
      </div>
    );

    return (
      <div>
        {meta}

        {this.renderMobile()}

        <div className="SearchResults-layout">
          {sidebar}
          {isFetching ? this.renderPreloader() : (
            <div className="SearchResults-container">
              <div className="AppContainer">
                <div className="SearchResults-containerInner">
                  {this.renderDesktop(text)}
                  <Recipes />
                </div>
              </div>
            </div>
          )}
        </div>

        <AuthForOnboarding />
      </div>
    );
  }
}

SearchResults.propTypes = {
  isFetching: PropTypes.any,
  numberOfResults: PropTypes.number.isRequired,
  term: PropTypes.string.isRequired,
  prefCategories: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  onTermSearch: PropTypes.func.isRequired,
  onFiltersApply: PropTypes.func.isRequired,
  onFiltersReset: PropTypes.func.isRequired,
  onFiltersOpen: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  facetsHits: PropTypes.object.isRequired,
};

export default SearchResults;
