
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import isNil from 'lodash/isNil';
import head from 'lodash/head';
import map from 'lodash/map';

import Checkbox from 'components/ui-elements/Checkbox';

class CheckboxGroup extends Component {

  constructor(props) {
    super(props);

    this.isChecked = bind(this.isChecked, this);
    this.itemToggler = bind(this.itemToggler, this);
  }

  isChecked(item) {
    const { value } = this.props;
    return value.indexOf(item) >= 0;
  }

  itemToggler(item) {
    const { type } = this.props;
    const isRadio = type === 'radio';

    return (checked) => {
      const { onChange, value } = this.props;

      if (isRadio) {
        if (checked) {
          onChange([item]);
        } else {
          onChange([]);
        }
        return;
      }

      const withRemoved = filter(value, x => x !== item);
      if (checked) {
        onChange(withRemoved.concat([item]));
      } else {
        onChange(withRemoved);
      }
    };
  }

  renderItems() {
    const {
      type,
      options,
      columns,
    } = this.props;

    const items = map(options, ({ value, label, count }) => (
      <div key={value} className="SearchFilters-checkboxes-checkbox">
        <Checkbox
          type={type}
          label={
            <span>
              {label}
              {isNil(count) || (
                <span className="SearchFilters-checkboxes-checkbox-count">{count}</span>
              )}
            </span>
          }
          onChange={this.itemToggler(value)}
          checked={this.isChecked(value)}
        />
      </div>
    ));

    const indexed = map(items, (x, i) => [x, i]);
    const groups = groupBy(indexed, ([, i]) => i % columns);
    const grouped = map(groups, x => map(x, head));

    return map(grouped, (group, key) => (
      <div key={key} className="SearchFilters-checkboxes-group">
        {group}
      </div>
    ));
  }

  render() {
    return (
      <div className="SearchFilters-checkboxes">
        {this.renderItems()}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  columns: PropTypes.number,
};

CheckboxGroup.defaultProps = {
  columns: 2,
};

export default CheckboxGroup;
