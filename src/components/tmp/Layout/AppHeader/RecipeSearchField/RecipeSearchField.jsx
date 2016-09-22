
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import { Link } from 'react-router';

import bind from 'lodash/bind';
import classnames from 'classnames';
import map from 'lodash/map';
import size from 'lodash/size';

import { APPLY_FILTERS, RECIPES_FILTER } from 'constants/QueryParams';
import { ENTER, ESCAPE, UP_ARROW, DOWN_ARROW } from 'constants/KeyCodes';
import { POPULAR } from 'constants/SearchPredefinedTerms';
import { SEARCH_RESULTS } from 'constants/Routes';

import { on, off } from 'helpers/event';

import iconSearch from 'assets/images/icons/icon-search.svg';

import Icon from 'components/ui-elements/Icon';

const ItemLink = ({ selected, children, term }) => (
  <div className="AppHeader-search-dropdown-item">
    <Link
      className={classnames({
        'AppHeader-search-dropdown-item-link': true,
        'AppHeader-search-dropdown-item-link--selected': selected,
      })}
      to={{
        pathname: SEARCH_RESULTS,
        query: {
          [RECIPES_FILTER]: term,
          [APPLY_FILTERS]: true,
        },
      }}
    >
      {children}
    </Link>
  </div>
);

const SearchDropdown = ({ selectedIndex }) => {
  const popularLinks = map(POPULAR, ({ term, text }, idx) => (
    <ItemLink
      selected={idx === selectedIndex}
      key={term}
      term={term}
    >
      {text}
    </ItemLink>
  ));

  return (
    <div className="AppHeader-search-dropdown">
      <div className="AppHeader-search-dropdown-container">
        <div className="AppHeader-search-dropdown-list">
          <div
            className="
              AppHeader-search-dropdown-item
              AppHeader-search-dropdown-item-label
            "
          >
            Popular searches:
          </div>

          {popularLinks}
        </div>
      </div>
    </div>
  );
};

const keyDownHandlers = {
  [UP_ARROW]() {
    const { selectedIndex, term } = this.state;
    const newIndex = Math.max(0, selectedIndex - 1);
    const { text } = POPULAR[newIndex] || term;
    this.setState({ selectedIndex: newIndex, term: text });
  },

  [DOWN_ARROW]() {
    const { selectedIndex, term } = this.state;
    const { length } = POPULAR;
    const newIndex = Math.min(length - 1, selectedIndex + 1);
    const { text } = POPULAR[newIndex] || term;
    this.setState({ selectedIndex: newIndex, term: text });
  },
};

class RecipeSearchField extends Component {
  constructor(props) {
    super(props);

    this.handleFocus = bind(this.handleFocus, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.onKeyDown = bind(this.onKeyDown, this);

    this.state = {
      isOpen: false,
      term: this.props.term,
      selectedIndex: -1,
    };
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
    on(document, 'keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.term !== this.state.term) {
      this.setState({ term: nextProps.term });
    }
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
    off(document, 'keydown', this.handleKeyDown);
  }

  onKeyDown(event) {
    const { keyCode } = event;
    const handler = keyDownHandlers[keyCode];
    if (handler) {
      handler.call(this, event);
      event.preventDefault();
    }
  }

  handleDocumentClick(event) {
    if (!this.state.isOpen) return undefined;

    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleFocus() {
    this.setState({ isOpen: true });
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER && event.target === this.refs.input) {
      event.preventDefault();
      const term = this.refs.input.value.trim();

      this.props.onTermChange(term);
      this.setState({ isOpen: false, term });
      this.refs.input.blur();
    } else if (event.keyCode === ESCAPE) {
      event.preventDefault();

      if (this.state.isOpen) {
        this.setState({ isOpen: false, term: this.refs.input.value.trim() });
        this.refs.input.blur();
      }
    }
  }

  render() {
    const { className, placeholder } = this.props;
    const { isOpen, term, selectedIndex } = this.state;

    const valueLink = {
      value: term,
      onChange: event => this.setState({
        selectedIndex: -1,
        term: event.target.value,
      }),
    };

    const showDropdown = isOpen && (selectedIndex >= 0 || size(term) < 3);
    const searchDropdown = showDropdown && (
      <SearchDropdown selectedIndex={selectedIndex} />
    );

    return (
      <div className={classnames('Search AppHeader-search', { 'is-open': isOpen }, className)}>
        <input
          autoComplete="off"
          className="Search-input AppHeader-search-input"
          placeholder={placeholder}
          ref="input"
          type="text"
          {...valueLink}
          onFocus={this.handleFocus}
          onKeyDown={this.onKeyDown}
        />

        <Icon className="Search-icon AppHeader-search-icon" glyph={iconSearch} />

        {searchDropdown}
      </div>
    );
  }
}

ItemLink.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
};

SearchDropdown.propTypes = {
  selectedIndex: PropTypes.number,
};

RecipeSearchField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  onTermChange: PropTypes.func.isRequired,
};

export default RecipeSearchField;
