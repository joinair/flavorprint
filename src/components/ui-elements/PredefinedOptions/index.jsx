
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import map from 'lodash/map';
import partial from 'lodash/partial';

import './styles.css';

const Option = ({ children, selected, onClick }) =>
  <div
    className={
      classnames('PredefinedOptions-option', { 'is-selected': selected })
    }
    onClick={onClick}
  >
    {children}
  </div>;

const PredefinedOptions = ({ label, options, onClick }) => {
  const contentLabel = label && (
    <div className="PredefinedOptions-label">{label}</div>
  );

  const content = map(options, option =>
    <Option
      key={option.text}
      selected={option.selected}
      onClick={partial(onClick, option)}
    >
      {option.text}
    </Option>
  );

  return (
    <div className="PredefinedOptions">
      {contentLabel}
      {content}
    </div>
  );
};

Option.propTypes = {
  children: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

PredefinedOptions.propTypes = {
  label: PropTypes.string,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      selected: PropTypes.bool,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  onClick: PropTypes.func.isRequired,
};

export default PredefinedOptions;
