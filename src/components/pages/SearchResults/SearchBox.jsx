
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import SearchField from 'components/ui-elements/SearchField';

class SearchBox extends Component {
  constructor() {
    super();
    this.state = { value: null };
    this.search = bind(this.search, this);
  }

  componentWillReceiveProps(newProps) {
    const { defaultValue } = newProps;
    if (defaultValue !== this.props.defaultValue) {
      this.setState({ value: defaultValue });
    }
  }

  search(e) {
    const { value } = this.state;
    const term = value && value.trim();

    this.props.onSearch(term);

    if (e) {
      e.preventDefault();
    }
  }

  render() {
    const { defaultValue } = this.props;
    const { value } = this.state;
    const onChange = e => this.setState({ value: e.target.value });

    return (
      <form onSubmit={bind(this.search, this)}>
        <SearchField
          autoComplete="off"
          className="SearchResults-searchField"
          value={value || defaultValue}
          onChange={onChange}
          placeholder="Find a recipe"
          type="text"
          onSubmit={this.search}
        />
      </form>
    );
  }
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default SearchBox;
