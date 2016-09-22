
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import './styles.css';
import iconSearch from 'assets/images/icons/icon-search.svg';

import Icon from 'components/ui-elements/Icon';

const SearchField = (props) => {
  const { onSubmit, className } = props;

  return (
    <div className="SearchField">
      <input
        {...props}
        className={classnames('SearchField-input', className)}
      />

      <div
        className="SearchField-iconContainer"
        onClick={onSubmit}
      >
        <Icon className="SearchField-icon" glyph={iconSearch} />
      </div>
    </div>
  );
};

SearchField.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SearchField;
