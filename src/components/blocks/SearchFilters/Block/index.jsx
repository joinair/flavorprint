
import React, { PropTypes } from 'react';

import omit from 'lodash/omit';

import '../styles.css';

export const Block = ({ children }) => (
  <div className="SearchFilters">
    {children}
  </div>
);

Block.propTypes = {
  children: PropTypes.node,
};

export const Text = props => (
  <span {...omit(props, 'children')}>
    {props.children}
  </span>
);

Text.propTypes = {
  children: PropTypes.node,
};

export const Group = props => (
  <div {...omit(props, 'children')}>
    {props.children}
  </div>
);

Group.propTypes = {
  children: PropTypes.node,
};

export default { Block, Group, Text };
