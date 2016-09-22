
import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';
import bind from 'lodash/bind';
import filter from 'lodash/filter';
import values from 'lodash/values';
import capitalize from 'lodash/capitalize';

import Icon from 'components/ui-elements/Icon';
import closeIcon from 'assets/images/icons/icon-close.svg';

import AutoComplete from '../AutoComplete';

class TagsPicker extends Component {
  constructor(props) {
    super(props);
    this.tagRemover = bind(this.tagRemover, this);
    this.onAdd = bind(this.onAdd, this);
  }

  onAdd({ text }) {
    this.addTag(text);
  }

  addTag(tag) {
    const { tags, value, onChange } = this.props;
    const newItem = tags[tag];
    if (newItem) {
      const filtered = filter(value, ({ text }) => text !== tag);
      onChange(filtered.concat([newItem]));
    }
  }

  removeTag(tag) {
    const { value, onChange } = this.props;
    onChange(filter(value, ({ text }) => text !== tag));
  }

  tagRemover(tag) {
    return (e) => {
      this.removeTag(tag);
      e.preventDefault();
    };
  }

  renderTags(tags) {
    const { style } = this.props;
    const wrapperStyle = `
      SearchFilters-tagsPicker-tag
      SearchFilters-tagsPicker-tag--${style}
    `;
    const iconStyle = `
      SearchFilters-tagsPicker-tag-icon
      SearchFilters-tagsPicker-tag-icon--${style}
    `;

    return map(tags, ({ canonicalName, text }) => (
      <div key={canonicalName} className={wrapperStyle}>
        {capitalize(text)}
        <a
          href="#"
          className="SearchFilters-tagsPicker-tag-iconWrapper"
          onClick={this.tagRemover(text)}
        >
          <Icon
            glyph={closeIcon}
            className={iconStyle}
          />
        </a>
      </div>
    ));
  }

  render() {
    const { value, tags } = this.props;

    return (
      <div className="SearchFilters-tagsPicker">
        <AutoComplete
          onSubmit={this.onAdd}
          products={values(tags)}
        />
        {this.renderTags(value)}
      </div>
    );
  }
}

TagsPicker.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  tags: PropTypes.object.isRequired,
  style: PropTypes.string,
};

TagsPicker.defaultProps = {
  style: 'broccoli',
};

export default TagsPicker;
