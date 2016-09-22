
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import map from 'lodash/map';

import { on, off } from 'helpers/event';

import { ENTER, ESCAPE } from 'constants/KeyCodes';
import { POPULAR } from 'constants/SearchPredefinedTerms';

import iconSearch from 'assets/images/icons/icon-search.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';
import ModalHeader from 'components/tmp/Modal/ModalHeader';
import PredefinedOptions from 'components/ui-elements/PredefinedOptions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = bind(this.handleKeyDown, this);
    this.handleSearch = bind(this.handleSearch, this);
  }

  componentDidMount() {
    this.refs.input.focus();
    on(document, 'keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    off(document, 'keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER && event.target === this.refs.input) {
      event.preventDefault();
      this.handleSearch();
    } else if (event.keyCode === ESCAPE) {
      event.preventDefault();
      this.props.onClose();
    }
  }

  handleSearch() {
    const term = this.refs.input.value.trim();

    this.props.onTermSearch(term);
  }

  render() {
    const { term, onClose, onTermSearch } = this.props;

    const onOptionClick = option => onTermSearch(option.text);
    const popular = map(POPULAR, option => ({ text: option.term }));

    return (
      <div className="SearchModal">
        <ModalHeader closeButton title="Search" onHide={onClose} />

        <div className="SearchModal-form">
          <div className="SearchModal-inputContainer">
            <input
              autoComplete="off"
              className="SearchModal-input"
              defaultValue={term}
              placeholder="Find a recipe"
              ref="input"
              type="text"
            />

            <div
              className="SearchModal-iconContainer"
              onClick={this.handleSearch}
            >
              <Icon className="SearchModal-icon" glyph={iconSearch} />
            </div>
          </div>

          <PredefinedOptions
            label="Popular searches:"
            options={popular}
            onClick={onOptionClick}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  term: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onTermSearch: PropTypes.func.isRequired,
};

export default Search;
