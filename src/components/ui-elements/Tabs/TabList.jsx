
import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TabList = ({ children, className }) => (
  <ul className={classnames('TabList', className)}>
    {children}
  </ul>
);

TabList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default TabList;
